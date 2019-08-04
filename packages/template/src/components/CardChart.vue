<template>
  <b-card>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem exercitationem ullam quae tempora consequatur. Dicta ipsum necessitatibus perspiciatis, id tempore praesentium neque ducimus quidem dolor fugit itaque voluptate assumenda non!
  </b-card>
</template>

<script>
import { MaximizeIcon, MinimizeIcon } from 'vue-feather-icons'

export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  components: {
    MaximizeIcon,
    MinimizeIcon
  }
}
</script>
