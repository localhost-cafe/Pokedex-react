export const fetchPokemons = async (offset, limit) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await res.json();

  return data.results;
};

export const fetchPokemonDetails = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
