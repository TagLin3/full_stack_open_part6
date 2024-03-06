module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: "airbnb",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: [
    "jest",
  ],
  rules: {
    indent: [
      "error",
      2,
    ],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always",
    ],
    "arrow-spacing": [
      "error", { before: true, after: true },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "always",
    ],
    "no-console": 0,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/function-component-definition": 0,
    "default-param-last": 0,
  },
};
