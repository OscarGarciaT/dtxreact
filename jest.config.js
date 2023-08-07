export default {
    transform: {},
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    extensionsToTreatAsEsm: [".js", ".jsx"],
    globals: {
      "ts-jest": {
        useESM: true, // Habilitar el soporte para ESM
      },
    },
  };