import './PokemonCard.css';

function PokemonCard({ pokemon, onSelect, isActive }) {
  return (
    <div
      className={`pokemon-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map((typeObj, index) => (
          <span
            key={`${typeObj.type.name}-${index}`}
            className={`type ${typeObj.type.name}`}
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
