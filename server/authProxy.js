const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch'); // pastikan sudah install
const { fetch } = require('undici');

const app = express();
const PORT = 3001; // Jangan pakai 5173, karena itu dipakai Vite

app.use(cors());
app.use(bodyParser.json());

const apiUrl = 'https://api.gardenision.com/broadcasting/auth';

app.post('/auth.php', async (req, res) => {
  const token = req.headers.authorization || ''; // Ambil token dari header Authorization
    console.log('Token:', token);
    console.log('Body request:', req.body);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await response.text(); // Supaya aman meskipun kosong
    console.log('🔁 Response from Gardenision:', response.status, responseText);

    res.status(response.status).send(responseText || '{}');
  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
