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
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "testEnvironment" : "jsdom"
}

export default config;