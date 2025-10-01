import './PokemonListSpinner.css';

const PokemonListSpinner = () => {
  return (
    <div className="pokemon-list-spinner">
      <img
        src="/src/assets/loading.png"
        alt="spinner-pikachu"
        className="spinner-image"
      />
    </div>
  );
};

export default PokemonListSpinner;
