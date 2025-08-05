import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();

// ✅ Proxy ke API external
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://api.gardenision.com',
        changeOrigin: true
    })
);

// ✅ Proxy untuk auth → broadcasting/auth
app.use(
    '/auth',
    createProxyMiddleware({
        target: 'https://api.gardenision.com',
        changeOrigin: true,
        pathRewrite: { '^/auth': '/broadcasting/auth' }
    })
);

// ✅ Serve file statis Vite
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
