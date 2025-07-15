import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

export default function PokemonList({ pokemons, onSelect, selectedPokemon }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={onSelect}
          isActive={selectedPokemon?.id === pokemon.id}
        />
      ))}
    </div>
  );
}
