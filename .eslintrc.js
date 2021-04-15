module.exports = {
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "max-classes-per-file": "off",
    "no-console": "off"
  }
};
