<template>
  <b-card>
    <b-form-input
      v-model="keyword"
      placeholder="Search something ..."
    />
    <b-nav vertical>
      <b-nav-item
        v-for="item in data"
        :key="item.index"
      >
        {{ item.name || item.componentName }}
      </b-nav-item>
    </b-nav>
  </b-card>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'

export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => ''
    }
  },
  components: {
    ArrowRightIcon
  },
  data() {
    return {
      keyword: ''
    }
  }
}
</script>
