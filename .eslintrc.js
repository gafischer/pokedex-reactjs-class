module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'plugin:react/recommended',
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/no-unused-state': 'warn',
    'react/prop-types': 'warn',
    'react/function-component-definition': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
