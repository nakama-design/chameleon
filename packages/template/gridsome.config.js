const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/_globals.scss')
      ],
    })
}

module.exports = {
  // laboon-config
  plugins: [],
  chainWebpack (config) {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
