const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  initPlugin(on, config);

  // Agrega Mochawesome a la configuración
  on('after:run', (results) => {
    require('mochawesome/generate')(results);
  });
};