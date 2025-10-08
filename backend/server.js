const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});

app.get('/api/fetchPokemons', async (req, res) => {
  try {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    res.status(500).json({ message: 'Failed to fetch pokemons' });
  }
});

app.get('/api/pokemonDetails', async (req, res) => {
  try {
    const pokemonUrl = req.query.url;

    if (!pokemonUrl) {
      return res.status(400).json({ error: 'Missing query parameter: url' });
    }

    const response = await fetch(pokemonUrl);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'PokeAPI request failed' });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching pokemon details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
