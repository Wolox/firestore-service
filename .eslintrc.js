module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jest/globals": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "prettier",
    "flowtype",
    "jest"
  ],
  "extends": [
    "eslint:recommended",
    "airbnb",
    "prettier"
  ],
  "globals": {
    "__DEV__": true,
  },
  "rules": {
    "prettier/prettier": ["error", { printWidth: 110, singleQuote: true }],
    "no-invalid-this": "off",
    "no-return-assign": "off",
    "no-param-reassign": "off",
    "no-nested-ternary": "off",
    "import/order": ["error", {"newlines-between": "always"}],
    "import/prefer-default-export": "off",
    "import/no-unresolved": "error",
    "import/extensions": ["error", { js: "never" }],
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/no-absolute-path": "error"
  }
};
