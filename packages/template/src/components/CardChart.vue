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
      <div v-else class="d-flex align-items-center">
        <h1>{{ data.total }}</h1>
        <div class="ml-3">
          {{ typeof data.total == 'number' ? 'Files' : '' }} {{ data.name }}
        </div>
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

<style lang="scss" scoped>
.card {
  .card-body {
    padding: 12px 20px;
  }
}
</style>

