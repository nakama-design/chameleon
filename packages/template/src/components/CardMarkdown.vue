<template>
  <div class="viewer">
    <div
      class="viewer-content markdown-body"
      v-html="string"
    />
  </div>
</template>

<script>
import marked from 'marked'
import mermaid from 'mermaid'

export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => ''
    }
  },
  data() {
    return {
      string: ''
    }
  },
  mounted() {
    if (process.isClient) {
      this.render(this.data.content)
    }
  },
  methods: {
    render(string) {
      this.string = marked(string)

      setTimeout(() => {
        if (process.isClient && this.data.schema) {
          Object.keys(this.data.schema).map(className => {
            const container = document.querySelector(`#${className}`)

            if (typeof window !== 'undefined') {
              if (container && container.firstChild) {
                return
              }

              mermaid.render(`mermaid${className}`, this.data.schema[className], code => {
                if (container) {
                  container.innerHTML = code
                }
              })
            }
          })
        }
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import 'github-markdown-css';

.mermaid-chart {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.viewer {
  cursor: default;
  background-color: #FAFAFA;
  padding: 20px;
  border-radius: 6px;
}
</style>
