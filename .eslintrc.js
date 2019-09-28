module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "react-hooks"
    // "jsx-a11y",
    // "import",
    // "eslint-plugin-prettier",
    // "eslint-plugin-react"
  ],
  "env": {
    "jest": true,
    "es6": true,
  },
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-use-before-define": "off",
    "no-console": "warn",
    "indent": ["error", 2],
    "react/prop-types": "off"
  },
  "globals": {
    "setTimeout": false,
    "clearTimeout": false,
    "setInterval": false,
    "clearInterval": false,
    "console": false,
    "fetch": false,
    "module": false,
  }
};
