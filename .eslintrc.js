module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 分号
    semi: [0, "always"],
    "space-before-function-paren": 0,
    "spaced-comment": 0,
    "no-unneeded-ternary": 0,
    quotes: 0,
    "eol-last": 0,
    "no-throw-literal": 0,
    "no-trailling-spaces": 0,
    "padded-blocks": 0,
    "one-var": 0
    // "prettier/prettier": "off"
  }
};
