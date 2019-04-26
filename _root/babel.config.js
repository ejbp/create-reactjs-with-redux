module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          useBuiltIns: false,
          debug: false
        }
      ]
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-regenerator",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-transform-modules-commonjs",
      ["@babel/plugin-transform-runtime", {
        "absoluteRuntime": false,
        "corejs": false, //2
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }],
      "dynamic-import-webpack"
    ]
  };
}