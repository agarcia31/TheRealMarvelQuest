const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Enable CORS to allow requests from your frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy endpoint for Marvel API requests
app.get('/api/marvel', async (req, res) => {
  const { ts, apiKey, hash } = req.query;
  const marvelApiUrl = `https://gateway.marvel.com/v1/public${req.url}`;

  try {
    const response = await fetch(`${marvelApiUrl}&ts=${ts}&apikey=${apiKey}&hash=${hash}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Marvel API' });
  }
});

// Start the server
const port = 3000; // Choose any available port number
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
