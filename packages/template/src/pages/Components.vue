<template>
  <Layout>
    <Heading
      title="Components"
    />
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
import Components from '@/data/components.json'
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'

export default {
  metaInfo: {
    title: 'Components'
  },
  components: {
    Heading,
    Card
  },
  data() {
    return {
      ...Components
    }
  }
}
</script>
