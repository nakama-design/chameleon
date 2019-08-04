<template>
  <b-card>
    <b-card>
      Search
    </b-card>
    <ul>
      <li>Project 1</li>
    </ul>
  </b-card>
</template>

<script>
import { MaximizeIcon, MinimizeIcon } from 'vue-feather-icons'

export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => ''
    }
  },
  components: {
    MaximizeIcon,
    MinimizeIcon
  }
}
</script>
