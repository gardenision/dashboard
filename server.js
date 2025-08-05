import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();

// ✅ Proxy sesuai vite.config.mjs
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://api.gardenision.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
    })
);

app.use(
    '/auth',
    createProxyMiddleware({
        target: 'https://api.gardenision.com',
        changeOrigin: true,
        pathRewrite: { '^/auth': '/broadcasting/auth' }
    })
);

// ✅ Serve file statis Vite (dist)
app.use(express.static(join(__dirname, 'dist')));

// ✅ SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// ✅ Listen di port Dokku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
