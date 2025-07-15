import "./PokemonCard.css";

function PokemonCard({ pokemon, onSelect, isActive }) {
  return (
    <div
      className={`pokemon-card ${isActive ? "active" : ""}`}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
