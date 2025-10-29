import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonDetails, fetchPokemons } from './Api/pokemons-api';

import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import PokemonDetailsModal from './components/PokemonDetailsModal/PokemonDetailsModal';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonListSpinner from './components/PokemonListSpinner/PokemonListSpinner';

import { POKEMON_TYPE } from './constants/pokemon-types';

function App() {
  const [selectedType, setSelectedType] = useState('all');
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 9;
  const [isPokemonsLoading, setIsPokemonsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const loadPokemons = useCallback(async () => {
    setIsPokemonsLoading(true);
    try {
      const newPokemons = await fetchPokemons(offset, limit, selectedType);

      const detailed = await Promise.all(
        newPokemons.map(async (p) => {
          if (p.sprites && p.stats) return p;
          return await fetchPokemonDetails(p.url);
        })
      );

      setPokemons((prev) => {
        const combined = [...prev, ...detailed];
        const unique = combined.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id)
        );
        return unique;
      });

      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error('❌ Error loading pokemons:', error);
    } finally {
      setIsPokemonsLoading(false);
    }
  }, [offset, limit, selectedType]);

  useEffect(() => {
    setPokemons([]);
    setOffset(0);
    loadPokemons();
  }, [selectedType]);

  const handleSelectPokemon = async (pokemon) => {
    try {
      if (!pokemon.sprites || !pokemon.stats) {
        const detailed = await fetchPokemonDetails(pokemon.url);
        console.log(detailed);
        setSelectedPokemon(detailed);
      } else {
        setSelectedPokemon(pokemon);
      }
    } catch (error) {
      console.error('❌ Failed to load pokemon details:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="pokemon-list-container" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Filter
            types={[
              POKEMON_TYPE.ALL,
              ...Object.values(POKEMON_TYPE).filter(
                (t) => t !== POKEMON_TYPE.ALL
              ),
            ]}
            selectedType={selectedType}
            onChange={setSelectedType}
          />

          {isPokemonsLoading && pokemons.length === 0 ? (
            <PokemonListSpinner />
          ) : (
            <>
              <PokemonList
                pokemons={pokemons}
                onSelect={handleSelectPokemon}
                selectedPokemon={selectedPokemon}
              />
              {!isPokemonsLoading && pokemons.length > 0 && (
                <LoadMoreButton
                  onClick={loadPokemons}
                  isPokemonsLoading={isPokemonsLoading}
                />
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
