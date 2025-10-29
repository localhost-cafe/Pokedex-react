import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/fetchPokemons', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || 'all';

    console.log('📡 Запит покемонів:', { offset, limit, type });

    let pokemons = [];

    if (type === 'all') {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      pokemons = data.results;
    } else {
      const typeResponse = await fetch(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      const typeData = await typeResponse.json();
      pokemons = typeData.pokemon
        .map((p) => p.pokemon)
        .slice(offset, offset + limit);
    }

    res.json(pokemons);
  } catch (error) {
    console.error('❌ Помилка при отриманні покемонів:', error);
    res.status(500).json({ error: 'Failed to fetch pokemons' });
  }
});

app.get('/api/pokemonDetails', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing url parameter' });

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ Помилка при отриманні деталей покемона:', error);
    res.status(500).json({ error: 'Failed to fetch pokemon details' });
  }
});

app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
