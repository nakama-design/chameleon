<template>
  <Layout>
    <div class="row">
      <div class="col-3">
        <Sidebar :data="{}" />
      </div>
      <div class="col-9">
        <div role="tablist">
          <Card
            v-for="(item, index) in $context.content"
            :key="index"
            :index="index"
            :data="item"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Card from '@/components/CardItem.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  metaInfo: {
    title: 'Documents'
  },
  components: {
    Card,
    Sidebar
  }
}
</script>
