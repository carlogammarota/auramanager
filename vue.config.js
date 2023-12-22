const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3322, // Cambia 3000 por el número de puerto que prefieras
  }
});
