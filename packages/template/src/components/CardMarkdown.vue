<template>
  <div class="viewer">
    <div class="viewer-content"
      v-html="render(content)"
    />
  </div>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    content: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    render(string) {
      return marked(string)
    }
  }
}
</script>
