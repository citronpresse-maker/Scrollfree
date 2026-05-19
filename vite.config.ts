import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs/promises';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

function gradientSavePlugin() {
  return {
    name: 'gradient-save',
    configureServer(server: any) {
      server.middlewares.use('/api/save-gradient', async (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const filename = (data.filename || "home.gradient.json").replace(/[^a-zA-Z0-9._-]/g, "");
              const dir = path.resolve(__dirname, 'public', 'gradients');
              await fs.mkdir(dir, { recursive: true });
              await fs.writeFile(path.join(dir, filename), JSON.stringify(data.preset, null, 2), 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, file: `public/gradients/${filename}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(err.message);
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), gradientSavePlugin(), visualizer({ open: false })],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          simulateur: path.resolve(__dirname, 'simulateur.html'),
          cgv: path.resolve(__dirname, 'cgv.html'),
          confidentialite: path.resolve(__dirname, 'confidentialite.html'),
          'mentions-legales': path.resolve(__dirname, 'mentions-legales.html'),
          remboursement: path.resolve(__dirname, 'remboursement.html'),
        },
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
          }
        }
      }
    }
  };
});
