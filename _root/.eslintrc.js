const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "cordova": "readonly",
    "__DEV__": "readonly",
    "__webpack_public_path__": "writable" //to use as hack to cordova bundled app
  },
  "plugins": [
    "react",
    "prettier",
    "react-hooks",
    "compat"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "compat/compat": "error",
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "import/imports-first": ["error", "absolute-first"],
    "import/newline-after-import": "error",
    "import/no-unresolved": [2, {
      "ignore": ["apr-intercept"]
    }],
    "camelcase": [
      "error",
      {
        allow: ["__webpack_public_path__"]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "array-callback-return": "off",
    "class-methods-use-this": "off",
    "eqeqeq": "off",
    "react/destructuring-assignment": "off",
    "consistent-return": "off",
    "no-plusplus": "off",
    "react/forbid-prop-types": "off",
    "no-unused-vars": [
      "error", 
      { 
        "vars": "all", 
        "args": "none", 
        "ignoreRestSiblings": true,
        "caughtErrors": "none" 
      }
    ],
    "no-param-reassign": ["error", { "props": true } ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["."]
      },
      "webpack": {
        "config": './webpack.config.js'
      },
      "polyfills": [
        // Example of marking entire API and all methods and properties as polyfilled
        "Promise",
        // Example of marking specific method of an API as polyfilled
        "WebAssembly.compile",
        // Example of API with no property (i.e. a function)
        "fetch",
        // Example of instance method, must add `.prototype.`
        "Array.prototype.push",
        "Object.prototype.values",
      ],
    }
  }
};