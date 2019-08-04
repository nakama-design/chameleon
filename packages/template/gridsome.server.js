const sources = require('./src/data/laboon.json')

module.exports = function (api) {
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  api.createPages(({ createPage }) => {
    Object.keys(sources).map(page => {
      createPage({
        path: `/list/${page}`,
        component: './src/pages/List.vue',
        context: {
          page: page,
          content: sources[page]
        }
      })
    })
  })
}
