import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-albra-html',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const blogRewrites: Record<string, string> = {
            '/blog': '/blog.html',
            '/blog/cerveau-popcorn': '/blog-cerveau-popcorn.html',
            '/blog/cout-physique-scroll-sedentarite-text-neck': '/blog-cout-physique-scroll-sedentarite-text-neck.html',
            '/blog/dopamine-reseaux-sociaux': '/blog-dopamine-reseaux-sociaux.html',
            '/blog/fatigue-oculaire-ecran': '/blog-fatigue-oculaire-ecran.html',
            '/blog/insomnie-smartphone': '/blog-insomnie-smartphone.html',
            '/blog/lumiere-bleue-insomnie-sommeil': '/blog-lumiere-bleue-insomnie-sommeil.html',
            '/blog/neuroplasticite-scroll-infini-cerveau': '/blog-neuroplasticite-scroll-infini-cerveau.html',
            '/simulateur': '/simulateur.html',
            '/cgv': '/cgv.html',
            '/confidentialite': '/confidentialite.html',
            '/mentions-legales': '/mentions-legales.html',
            '/remboursement': '/remboursement.html',
          };
          const url = req.url?.split('?')[0] ?? '';
          if (blogRewrites[url]) {
            req.url = blogRewrites[url];
          } else if (url === '/' || url === '/index.html') {
            req.url = '/index-albra.html';
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../app'),
    },
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    hmr: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index-albra.html'),
      },
    },
  },
});
