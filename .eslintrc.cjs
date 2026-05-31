// ESLint config. The signature rule here is the "no raw colours" guard in
// src/sections/** and src/components/**: every colour must come from a
// var(--color-*) token (injected by ThemeProvider), never a hardcoded literal -
// this is what keeps the boilerplate reusable rather than drifting back into a
// hardcoded site.
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "18" } },
  plugins: ["react", "react-hooks"],
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    // Vite uses the automatic JSX runtime; React need not be in scope.
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["src/sections/**/*.{js,jsx}", "src/components/**/*.{js,jsx}"],
      excludedFiles: ["**/*.test.{js,jsx}"],
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector: "Literal[value=/#[0-9a-fA-F]{3,8}/]",
            message:
              "No raw colour literals in sections/components - use a var(--color-*) theme token instead.",
          },
        ],
      },
    },
    {
      files: ["**/*.test.{js,jsx}"],
      env: { node: true },
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
    {
      files: ["scripts/**/*.mjs", "*.config.js", "vite.gallery.config.js", "vitest.*.js"],
      env: { node: true },
    },
  ],
  ignorePatterns: ["dist/", "dist-gallery/", "node_modules/", "*.min.js"],
}
