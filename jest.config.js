module.exports = {
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig-test.json",
      // diagnostics: true
    }
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@cityofzion)"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/dist/"
  ],
  testRegex: "(/src/__(tests|integration)__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
