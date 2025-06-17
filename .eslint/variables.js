// https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js

import tseslint from 'typescript-eslint';

export const variablesConfig = {
  files: ['**/*.js', '**/*.ts', '**/*.vue'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    // Enforce or disallow variable initializations at definition
    'init-declarations': 'off',

    // Disallow the catch clause parameter name being the same as a variable in the outer scope
    'no-catch-shadow': 'off',

    // Disallow deletion of variables
    'no-delete-var': 'error',

    // Disallow labels that share a name with a variable
    // https://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // Disallow specific globals
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
    ],

    // Disallow declaration of variables already declared in the outer scope
    // https://typescript-eslint.io/rules/no-shadow/
    '@typescript-eslint/no-shadow': 'error',

    // Disallow shadowing of names such as arguments
    // https://eslint.org/docs/latest/rules/no-shadow-restricted-names
    'no-shadow-restricted-names': 'error',

    // Disallow use of undefined when initializing variables
    // https://eslint.org/docs/latest/rules/no-undef-init
    'no-undef-init': 'error',

    // Disallow declaration of variables that are not used in the code
    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // Disallow use of variables before they are defined
    // https://typescript-eslint.io/rules/no-use-before-define/
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
  },
};
