<template>
  <Layout>
    <Heading
      title="Documents"
    />
    <div role="tablist">
      <Card
        index="1"
      />
      <Card
        index="2"
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
      Documents
    }
  }
}
</script>
