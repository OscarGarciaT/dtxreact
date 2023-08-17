import { defineConfig } from "cypress";
export default defineConfig({
  reporter: "cypress-mochawesome-reporter", 
  reporterOptions: {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": true,
    "json": true
 },
  e2e: {
    specPattern: "./cypress/integration/*.spec.js",
    baseUrl: 'https://dentelx.vercel.app/login',
    setupNodeEvents(on, config) {
    },
  },
});
