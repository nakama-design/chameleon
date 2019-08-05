<template>
  <b-card>
    <div class="card-heading">
      {{ title }}
    </div>
    <div class="card-body">
      <LineChart
        v-if="type === 'chart'"
        :data="data"
      />
      <div v-else>
        <h2>{{ data.total }}</h2>
        <h4>{{ data.name }}</h4>
      </div>
    </div>
  </b-card>
</template>

<script>
import LineChart from './Line.vue'

export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    },
    data: {
      type: [Object, Array],
      default: () => {}
    }
  },
  components: {
    LineChart
  }
}
</script>
