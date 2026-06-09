import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@panelsaas': fileURLToPath(new URL('./src/panelsaas', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              if (id.includes('/src/i18n/locales/')) {
                return 'i18n-locales';
              }
              if (id.includes('/src/views/guides/') || id.includes('GuideLocalizedPage')) {
                return 'marketing-guides';
              }
              if (id.includes('/src/views/legal/')) {
                return 'marketing-legal';
              }
              if (id.includes('ApaConverterView') || id.includes('ApaGeneratorView')) {
                return 'marketing-generator';
              }
              return undefined;
            }
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router') || id.includes('@vue')) {
              return 'vendor-vue';
            }
            if (id.includes('lucide-vue-next')) {
              return 'vendor-icons';
            }
            if (id.includes('axios')) {
              return 'vendor-http';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // Mismo host que VITE_API_BASE_URL (localhost ↔ localhost o 127.0.0.1 ↔ 127.0.0.1); no mezclar ambos.
      host: env.VITE_DEV_HOST || 'localhost',
      port: Number(env.VITE_DEV_PORT || 5173),
      strictPort: true,
    },
  };
});
