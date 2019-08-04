<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <Card :data="{}" />
      </div>
      <div class="col-4">
        <Card :data="{}" />
      </div>
      <div class="col-4">
        <Card :data="{}" />
      </div>
      <div class="col-4">
        <Card :data="{}" />
      </div>
    </div>
  </Layout>
</template>

<script>
import Card from '@/components/CardChart.vue'

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    Card
  }
}
</script>
