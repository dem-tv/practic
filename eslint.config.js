import prettierConfig from '@vue/eslint-config-prettier';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

/* eslint-disable import-x/extensions */
import { bestPracticesConfig } from './.eslint/best-practices.js';
import { errorsConfig } from './.eslint/errors.js';
import { importsConfig } from './.eslint/imports.js';
import { variablesConfig } from './.eslint/variables.js';

export default defineConfigWithVueTs(
  pluginVue.configs['flat/recommended'],
  bestPracticesConfig,
  errorsConfig,
  variablesConfig,
  importsConfig,
  vueTsConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  prettierConfig,
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.ts', 'src/**/*.vue'],
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      quotes: [2, 'single', { avoidEscape: true }],
      '@typescript-eslint/naming-convention': [
        2,
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 2,
      'prettier/prettier': 2,
    },
  },
  {
    files: ['src/**/*.vue', 'src/**/*.ts'],
    rules: {
      // 'vue/require-default-prop': 0,
      'vue/component-name-in-template-casing': [2, 'PascalCase'],
      'vue/component-definition-name-casing': [2, 'PascalCase'],
    },
  },
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.stories.ts'],
    rules: {
      'no-restricted-exports': [2, { restrictDefaultExports: { direct: true } }],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        2,
        {
          groups: [
            // Packages: `vue` related packages come first.
            ['^vue', '^@?\\w'],
            // Components.
            ['^(@/components/.*)(.vue)$'],
            // Composables, utils.
            ['^(@/composables/.*)$', '^(@/utils/.*)$'],
            // Assets.
            ['^(@/assets/.*)'],
            // Style imports.
            ['^.+\\.?(s?[ac]ss)|$'],
            // Types.
            ['^(@/types/.*)$'],
            // Constants.
            ['^(@/constants/.*)$', '^(@/.*/constants/.*)$'],
            // Other imports.
            ['^(@/.*)(.vue)$', '^(@/.*)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 2,
    },
  },
  globalIgnores(['dist']),
);
