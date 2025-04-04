import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Import lovable-tagger dynamically
import('lovable-tagger').then(({ componentTagger }) => {
  console.log('Lovable tagger loaded successfully');
}).catch(err => {
  console.error('Error loading lovable-tagger:', err);
});

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Dynamic import of componentTagger
  const { componentTagger } = await import('lovable-tagger');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ['lovable-tagger'], // Exclude from optimization
    },
  };
});
