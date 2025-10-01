import { useCallback, useEffect, useMemo, useState } from 'react';

import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import PokemonDetailsModal from './components/PokemonDetailsModal/PokemonDetailsModal';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonListSpinner from './components/PokemonListSpinner/PokemonListSpinner';

import { fetchPokemonDetails, fetchPokemons } from './Api/pokemons-api';
import { POKEMON_TYPE } from './constants/pokemon-types';

function App() {
  const [selectedType, setSelectedType] = useState('all');
  const [pokemons, setDetailedPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 12;
  const [isPokemonsLoading, setIsPokemonsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const loadPokemons = useCallback(async () => {
    setIsPokemonsLoading(true);
    try {
      const pokemons = await fetchPokemons(offset, limit);
      const detailedPokemons = await Promise.all(
        pokemons.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );

      setDetailedPokemons((prev) => [...prev, ...detailedPokemons]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error('Error loading pokemons:', error);
    } finally {
      setIsPokemonsLoading(false);
    }
  }, [offset, limit]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      if (selectedType === 'all') {
        return true;
      }
      if (!pokemon.types) {
        return false;
      }
      return pokemon.types.some((type) => type.name === selectedType);
    });
  }, [pokemons, selectedType]);

  return (
    <>
      <Header />
      <div className="pokemon-list-container" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Filter
            types={[
              POKEMON_TYPE.ALL,
              ...Object.values(POKEMON_TYPE).filter(
                (type) => type !== POKEMON_TYPE.ALL
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
                pokemons={filteredPokemons}
                onSelect={(pokemon) => setSelectedPokemon(pokemon)}
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
