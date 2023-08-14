import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "./cypress/integration/*.spec.js",
    baseUrl: 'https://dentelx.vercel.app/login',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
