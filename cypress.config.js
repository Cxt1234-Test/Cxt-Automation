const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

require("dotenv").config();

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,

  env: {
    ...process.env,
  },

  e2e: {
    baseUrl: "https://99070.cxtsoftware.net/xdispatch/",
    pageLoadTimeout: 120000, // Increase to 2 minutes
    requestTimeout: 30000,

    chromeWebSecurity: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",

    setupNodeEvents(on, config) {
      allureCypress(on, config);

      return config;
    },

    testIsolation: false,
    video: true,
  },

  component: {
    // devServer: {
    //   framework: "angular",
    //   bundler: "webpack",
    // },
    // specPattern: "**/*.cy.ts",
  },
});
