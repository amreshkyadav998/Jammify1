import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "main_app",
      remotes: {
        music_library: "http://localhost:4174/assets/remoteEntry.js",
        // music_library: 'https://jammify-taupe.vercel.app/assets/remoteEntry.js',
      },
      shared: ["react", "react-dom", "react-router-dom", "lucide-react"],
    }),
    {
      name: "vite-plugin-reload-endpoint",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/__fullReload") {
            server.hot.send({ type: "full-reload" });

            res.end("Full reload triggered");
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 4173,
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import federation from '@originjs/vite-plugin-federation'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     federation({
//       name: 'main_app',
//       remotes: {
//         music_library: 'https://jammify-taupe.vercel.app/assets/remoteEntry.js',
//       },
//       shared: {
//         react: { singleton: true, eager: true, requiredVersion: false },
//         'react-dom': { singleton: true, eager: true, requiredVersion: false },
//         'react-router-dom': { singleton: true },
//         'lucide-react': { singleton: true },
//       },
//     }),
//   ],
//   optimizeDeps: {
//     include: ['lucide-react'],
//   },
//   build: {
//     target: 'esnext',
//     chunkSizeWarningLimit: 1500,
//   },
//   server: {
//     port: 4173,
//   },
// })

// // main-app/vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import federation from '@originjs/vite-plugin-federation'

// export default defineConfig({
//   plugins: [
//     react({
//       jsxRuntime: 'automatic' // Add this
//     }),
//     tailwindcss(),
//     federation({
//       name: 'main_app',
//       remotes: {
//         music_library: 'https://jammify-taupe.vercel.app/assets/remoteEntry.js',
//       },
//       shared: {
//         react: {
//           requiredVersion: '19.1.1',
//           singleton: true,
//           eager: true,
//           version: '19.1.1'
//         },
//         'react-dom': {
//           requiredVersion: '19.1.1',
//           singleton: true,
//           eager: true,
//           version: '19.1.1'
//         },
//         'react-router-dom': {
//           requiredVersion: '6.8.2',
//           singleton: true,
//           version: '6.8.2'
//         },
//         'lucide-react': {
//           singleton: true,
//           version: '^0.542.0'
//         }
//       },
//     }),
//   ],
//   optimizeDeps: {
//     include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
//     exclude: ['music_library']
//   },
//   build: {
//     target: 'esnext',
//     chunkSizeWarningLimit: 1500,
//     commonjsOptions: {
//       include: [/node_modules/],
//       transformMixedEsModules: true
//     }
//   },
//   server: {
//     port: 4173
//   }
// })
