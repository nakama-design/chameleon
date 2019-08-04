<template>
  <Layout>
    <div role="tablist">
      <Card
        v-for="(item, index) in components"
        :key="index"
        :index="index"
        :data="item"
      />
    </div>
  </Layout>
</template>

<script>
import Card from '@/components/CardItem.vue'

export default {
  metaInfo: {
    title: 'Components'
  },
  components: {
    Card
  },
  data() {
    return {
      ...Components
    }
  }
}
</script>
