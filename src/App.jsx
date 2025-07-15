<<<<<<< HEAD
import { useEffect, useState } from "react";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import PokemonDetailsModal from "./components/PokemonDetailsModal/PokemonDetailsModal";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonListSpinner from "./components/PokemonListSpinner/PokemonListSpinner";

function App() {
  const [selectedType, setSelectedType] = useState("all");
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 12;
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemons = async (offset, limit) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    return data.results;
  };

  const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const loadPokemons = async () => {
    setLoading(true);
    try {
      const basicPokemons = await fetchPokemons(offset, limit);
      const detailedPokemons = await Promise.all(
        basicPokemons.map((p) => fetchPokemonDetails(p.url))
      );

      setPokemons((prev) => {
        const combined = [...prev, ...detailedPokemons];
        const uniqueMap = new Map();
        combined.forEach((pokemon) => {
          uniqueMap.set(pokemon.id, pokemon);
        });
        return Array.from(uniqueMap.values());
      });

      setOffset((prev) => prev + limit);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    if (selectedType === "all") return true;
    if (!pokemon.types) return false;
    return pokemon.types.some((t) => t.type.name === selectedType);
  });

  return (
    <>
      <Header />
      <div className="pokemon-list-container" style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filter
            types={["fire", "water", "grass", "electric"]}
            selectedType={selectedType}
            onChange={setSelectedType}
          />

          {loading && pokemons.length === 0 ? (
            <PokemonListSpinner />
          ) : (
            <>
              <PokemonList
                pokemons={filteredPokemons}
                onSelect={(pokemon) => setSelectedPokemon(pokemon)}
                selectedPokemon={selectedPokemon}
              />
              {!loading && pokemons.length > 0 && (
                <LoadMoreButton onClick={loadPokemons} loading={loading} />
              )}
            </>
          )}
        </div>

        {selectedPokemon && window.innerWidth <= 1024 && (
          <div className="modal-backdrop"></div>
        )}

        {selectedPokemon && (
          <PokemonDetailsModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
=======
export default function App() {
  return <h1>Hello Pokedex!</h1>;
}
>>>>>>> da597b176cc08e8edfb69bc5d76c50dbd5b5d5c4
