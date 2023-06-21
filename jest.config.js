const config = {
  "transform" : {
    "\\.[jt]sx?$": "babel-jest"
  },
  "moduleFileExtensions" : [
    "tsx",
    "ts",
    "jsx",
    "js"
  ],
  "moduleNameMapper" : {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/__mocks__/svgTransform.js"
  },
  "testEnvironment" : "jsdom",
  "setupFiles": ["whatwg-fetch"],
  "setupFilesAfterEnv" : ["<rootDir>/setupTests.js"]
}

export default config;