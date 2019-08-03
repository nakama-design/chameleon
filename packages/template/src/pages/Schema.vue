<template>
  <Layout>
    <Heading
      title="Schema"
    />
    <div role="tablist">
      <Card
        v-for="(item, index) in schema"
        :key="index"
        :index="index"
        :data="item"
      />
    </div>
  </Layout>
</template>

<script>
import Schema from '@/data/schema.json'
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'

export default {
  metaInfo: {
    title: 'Schema'
  },
  components: {
    Heading,
    Card
  },
  data() {
    return {
      ...Schema
    }
  }
}
</script>
