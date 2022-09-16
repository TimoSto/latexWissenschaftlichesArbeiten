const path = require('path');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testMatch: ["**/*.test.[jt]s?(x)", "**/__tests__/*.[jt]s?(x)"],
  reporters: ["default"],
  testEnvironment: "node",
  // Explicitly specify the path to babel.config.js relative to jest.config.js so
  // jest can find it even when jest.config.js is not in the root folder of the workspace
  // Copied from github.com/bazelbuild/rules_nodejs/examples/jest/jest.config.js
  transform:
    { '^.+\\.jsx?$': ['babel-jest', { configFile: path.resolve(__dirname, 'babel.config.js') }] },
};
