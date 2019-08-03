<template>
  <Layout>
    <Heading
      title="Routes"
    />
    <div role="tablist">
      <Card
        v-for="(item, index) in routes"
        :key="index"
        :index="index"
        :data="item"
      />
    </div>
  </Layout>
</template>

<script>
import Routes from '@/data/routes.json'
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'

export default {
  metaInfo: {
    title: 'Routes'
  },
  components: {
    Heading,
    Card
  },
  data() {
    return {
      ...Routes
    }
  }
}
</script>
