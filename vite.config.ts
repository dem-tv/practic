import vue from '@vitejs/plugin-vue';
import path from 'path';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';
import type { Plugin, UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import stylelintPlugin from 'vite-plugin-stylelint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueDevTools from 'vite-plugin-vue-devtools';

import createSvgIconTypesPlugin from './plugins/createSvgIconTypesPlugin';

// https://vite.dev/config/
const config: UserConfig = {
  plugins: [
    vue(),

    stylelintPlugin(),

    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
      symbolId: '[name]',
      inject: 'body-first',
    }),

    createSvgIconTypesPlugin({
      iconsDir: path.resolve(process.cwd(), 'src/assets/icons/'),
    }),

    // https://github.com/antfu/unplugin-auto-import
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    components({
      dirs: ['src/components'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'], // Удалить после обновления sass до 2.0 и добавления его поддержки в vite

        additionalData: '@use "@/assets/styles/partials/sass-mixins" as *;',
      },
    },
    devSourcemap: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    env: {
      TZ: 'Europe/Minsk',
    },
  },

  server: {
    host: true,
    port: 5181,
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (env.VUE_DEV_TOOLS_ACTIVE === 'true') config.plugins?.push(vueDevTools() as Plugin);
  return config;
});
