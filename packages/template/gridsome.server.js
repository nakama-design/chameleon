const sources = require('./src/data/laboon.json')

module.exports = function (api) {
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  api.createPages(({ createPage }) => {
    createPage({
      path: '/',
      component: './src/pages/Home.vue',
      context: sources
    })

    Object.keys(sources).map(page => {
      createPage({
        path: `/list/${page}`,
        component: './src/pages/List.vue',
        context: {
          page: page,
          content: sources[page],
          paths: Object.keys(sources).map(key => {
            return [key, sources[key].length]
          })
        }
      })

      sources[page].forEach((file, index) => {
        createPage({
          path: `/detail/${page}-${file.id}`,
          component: './src/pages/Detail.vue',
          context: {
            page: page,
            index: file.id,
            content: file
          }
        })
      })
    })
  })
}
