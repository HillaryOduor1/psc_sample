// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// 🚀 Simple in-memory cache for Vite dev server
const newsCache = new Map();

function pscNewsCachePlugin() {
  return {
    name: 'psc-news-cache',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Only intercept our specific API routes
        if (!req.url?.startsWith('/api/psc-news') && !req.url?.startsWith('/api/psc-news-post')) {
          return next();
        }

        const cacheKey = req.url;
        const cached = newsCache.get(cacheKey);

        // Serve from cache if it's less than 10 minutes old
        if (cached && Date.now() - cached.time < 10 * 60 * 1000) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Cache', 'HIT');
          return res.end(JSON.stringify(cached.data));
        }

        // Fetch from WordPress
        try {
          let wpUrl;
          if (req.url.startsWith('/api/psc-news-post')) {
            const urlObj = new URL(req.url, 'http://localhost');
            const slug = urlObj.searchParams.get('slug');
            wpUrl = `https://www.publicservice.go.ke/wp-json/wp/v2/posts?slug=${slug}&_embed&_fields=id,slug,date,link,title,content,excerpt,_embedded`;
          } else {
            wpUrl = `https://www.publicservice.go.ke/wp-json/wp/v2/posts?per_page=3&_embed&_fields=id,slug,date,link,title,excerpt,_embedded`;
          }

          const wpRes = await fetch(wpUrl);
          const data = await wpRes.json();

          // Save to cache
          newsCache.set(cacheKey, { time: Date.now(), data });

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Cache', 'MISS');
          res.end(JSON.stringify(data));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch from WordPress' }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    pscNewsCachePlugin(), // 👈 Add the cache plugin here
    legacy({
      targets: ["IE 11", "iOS >= 12", "Safari >= 12", "defaults", "not dead"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime", "whatwg-fetch", "core-js/stable"],
      renderLegacyChunks: true,
      modernPolyfills: true,
      polyfills: ["es.promise", "es.map", "es.set", "es.array.includes", "es.object.assign"],
    }),
  ],
  build: {
    target: "safari12",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
        configure: (proxy) => {
          proxy.on("error", (err) => console.log("proxy error", err));
          proxy.on("proxyReq", (proxyReq, req) =>
            console.log("Proxying:", req.method, req.url, "→", proxyReq.path)
          );
        },
      },
    },
  },
});


/*
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),

    legacy({
      // Targets for the LEGACY (ES5) bundle.
      // 'IE 11' ensures ES5 output for the oldest browsers.
      targets: [
        "IE 11",
        "iOS >= 12",
        "Safari >= 12",
        "defaults",
        "not dead",
      ],

      // Additional DOM polyfills needed by the legacy bundle.
      additionalLegacyPolyfills: [
        "regenerator-runtime/runtime",
        "whatwg-fetch",
        "core-js/stable",
      ],

      // Generate the legacy chunks (ES5 / SystemJS).
      renderLegacyChunks: true,

      // Keep polyfill detection for the modern bundle as well.
      modernPolyfills: true,

      // Explicitly include essential polyfills.
      polyfills: [
        "es.promise",
        "es.map",
        "es.set",
        "es.array.includes",
        "es.object.assign",
      ],
    }),
  ],

  build: {
    // The modern bundle is transpiled to Safari 12 syntax.
    // (Vite cannot target ES5 directly – the legacy plugin handles ES5.)
    target: "safari12",

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,

    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
        configure: (proxy) => {
          proxy.on("error", (err) => console.log("proxy error", err));
          proxy.on("proxyReq", (proxyReq, req) =>
            console.log(
              "Proxying:",
              req.method,
              req.url,
              "→",
              proxyReq.path
            )
          );
        },
      },
    },
  },
});*/

/* 
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["> 0.25%", "not dead", "IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime", "whatwg-fetch"],
      renderLegacyChunks: true,
      modernPolyfills: true,
      polyfills: ["es.promise", "es.map", "es.set", "es.array.includes", "es.object.assign"]
    })
  ],
  build: {
    target: "es5",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        configure: (proxy) => {
          proxy.on('error', (err) => console.log('proxy error', err));
          proxy.on('proxyReq', (proxyReq, req) => console.log('Proxying:', req.method, req.url, '→', proxyReq.path));
        }
      }
    }
  }
});*/

/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    
    legacy({
      targets: [
        "> 0.25%",
        "not dead",
        "IE 11"
      ],
      additionalLegacyPolyfills: [
        "regenerator-runtime/runtime",
        "whatwg-fetch"
      ],
      renderLegacyChunks: true,
      modernPolyfills: true,
      polyfills: [
        "es.promise",
        "es.map",
        "es.set",
        "es.array.includes",
        "es.object.assign",
        "es.symbol"
      ]
    })
  ],
  build: {
    target: "es5",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.method, req.url, '→', proxyReq.path);
          });
        }
      }
    }
  }
});*/
