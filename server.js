import express from 'express';
import proxy from 'express-http-proxy';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();

// ✅ Proxy ke API utama
app.use(
    '/api',
    proxy('https://api.gardenision.com', {
        proxyReqPathResolver: () => '/api'
    })
);

// ✅ Proxy untuk auth ke broadcasting/auth
app.use(
    '/auth',
    proxy('https://api.gardenision.com', {
        proxyReqPathResolver: () => '/broadcasting/auth'
    })
);

// ✅ Serve file statis dari Vite build
app.use(express.static(join(__dirname, 'dist')));

// ✅ Fallback untuk SPA routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// ✅ Listen di PORT dari Dokku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
