<template>
  <Layout>
    <Heading
      title="Documents"
    />
    <div role="tablist">
      <Card
        v-for="(item, index) in documents"
        :key="index"
        :index="index"
        :data="item"
      />
    </div>
  </Layout>
</template>

<script>
import Documents from '@/data/documents.json'
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'

export default {
  metaInfo: {
    title: 'Documents'
  },
  components: {
    Heading,
    Card
  },
  data() {
    return {
      ...Documents
    }
  }
}
</script>
