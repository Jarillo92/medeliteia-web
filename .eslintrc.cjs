module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // El proyecto no usa PropTypes
    'react/prop-types': 'off',
  },
  overrides: [
    {
      // Escenas de React Three Fiber: sus props (metalness, intensity...) son de Three.js, no del DOM
      files: ['src/components/hero/*Scene.jsx'],
      rules: { 'react/no-unknown-property': 'off' },
    },
  ],
}
