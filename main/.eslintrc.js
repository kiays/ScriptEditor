module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: [],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};
