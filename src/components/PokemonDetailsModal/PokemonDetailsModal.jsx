import './PokemonDetailsModal.css';

function findPokemonBaseStat(pokemon, statName) {
  if (!pokemon.stats) return '-';
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : '-';
}

export default function PokemonDetailsModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="pokemon-details-modal show">
      <button onClick={onClose} title="Close" className="close-button">
        &times;
      </button>

      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />

      <h2>
        {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)} #
        {pokemon.id?.toString().padStart(3, '0')}
      </h2>

      <table className="pokemon-stats-table">
        <tbody>
          <tr>
            <td>Type</td>
            <td>{pokemon.types?.map((t) => t.type.name).join(', ') || '-'}</td>
          </tr>
          <tr>
            <td>Attack</td>
            <td>{findPokemonBaseStat(pokemon, 'attack')}</td>
          </tr>
          <tr>
            <td>Defense</td>
            <td>{findPokemonBaseStat(pokemon, 'defense')}</td>
          </tr>
          <tr>
            <td>HP</td>
            <td>{findPokemonBaseStat(pokemon, 'hp')}</td>
          </tr>
          <tr>
            <td>SP Attack</td>
            <td>{findPokemonBaseStat(pokemon, 'special-attack')}</td>
          </tr>
          <tr>
            <td>SP Defense</td>
            <td>{findPokemonBaseStat(pokemon, 'special-defense')}</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>{findPokemonBaseStat(pokemon, 'speed')}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{pokemon.weight || '-'}</td>
          </tr>
          <tr>
            <td>Total moves</td>
            <td>{pokemon.moves?.length || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
