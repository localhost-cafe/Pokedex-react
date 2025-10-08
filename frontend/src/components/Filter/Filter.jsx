import './Filter.css';

const Filter = ({ types, selectedType, onChange }) => {
  return (
    <div className="pokemon-type-filter-container">
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
