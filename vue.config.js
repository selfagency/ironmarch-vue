const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ]
  }

  // pluginOptions: {
  //   i18n: {
  //     locale: 'en',
  //     fallbackLocale: 'en',
  //     localeDir: 'locales',
  //     enableInSFC: false
  //   }
  // }
}
