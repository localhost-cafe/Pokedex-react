export const fetchPokemons = async (offset = 0, limit = 10, type = 'all') => {
  const response = await fetch(
    `http://localhost:5000/api/fetchPokemons?offset=${offset}&limit=${limit}&type=${type}`
  );
  if (!response.ok) throw new Error('Failed to fetch pokemons');
  return response.json();
};

export const fetchPokemonDetails = async (url) => {
  const res = await fetch(
    `http://localhost:5000/api/pokemonDetails?url=${encodeURIComponent(url)}`
  );
  if (!res.ok) throw new Error('Failed to fetch pokemon details');
  return res.json();
};
