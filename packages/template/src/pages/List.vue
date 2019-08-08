<template>
  <Layout>
    <div class="row">
      <div class="col-3">
        <Sidebar
          :data="sidebarData"
          @search="searchSidebarData"
        />
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
import Fuse from 'fuse.js'

export default {
  metaInfo: {
    title: 'Documents'
  },
  components: {
    Card,
    Sidebar
  },
  data() {
    return {
      sidebarData: {
        general: []
      },
      saerchOptions: {
        caseSensitive: false,
        shouldSort: true,
        includeScore: false,
        includeMatches: false,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'path',
          'format',
          'name',
          'type',
          'method',
          'group_name',
          'group_slug'
        ]
      }
    }
  },
  mounted() {
    this.renderSidebar(this.$context.content)
  },
  methods: {
    renderSidebar(data) {
      if (Array.isArray(data)) {
        return data
          .map(file => {
            if (file.group) {
              if (!this.sidebarData[group]) {
                this.sidebarData[group] = []
              }
            }

            return file
          })
          .map(file => {
            if (file.group) {
              this.sidebarData[file.group].push(file)
            } else {
              this.sidebarData.general.push(file)
            }
          })
      }

      throw Error(`Variable ${data} is not Array type`)
    },
    searchSidebarData(keyword) {
      if (keyword.length > 0) {
        this.sidebarData = {
          general: []
        }
  
        const fuse = new Fuse(this.$context.content, this.saerchOptions)
  
        this.renderSidebar(fuse.search(keyword))
      } else {
        this.renderSidebar(this.$context.content)
      }
    }
  }
}
</script>
