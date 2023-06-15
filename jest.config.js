const config = {
  "transform" : {
    "\\.[jt]sx?$": "babel-jest"
  },
  "moduleFileExtensions" : [
    "tsx",
    "jsx",
    "js"
  ],
  "moduleNameMapper" : {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/__mocks__/svgTransform.js"
  },
  "testEnvironment" : "jsdom"
}

export default config;