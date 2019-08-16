<template>
  <Layout>
    <div class="row">
      <div class="col-3">
        <Sidebar
          :content="$context.paths"
          @search="searchContent"
        />
      </div>
      <div class="col-9">
        <div role="tablist">
          <div
            v-for="(items, parent) in content"
            :key="parent"
          >
            <div class="page-title">
              {{ parent }}
            </div>
            <Card
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :data="item"
            />
          </div>
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
      sidebar: [],
      content: {
        general: []
      },
      searchOption: {
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
    this.resetContent()
    this.renderSidebar(this.$context.content)
  },
  watch: {
    $context({ content }) {
      this.resetContent()
      this.renderSidebar(content)
    },
  },
  methods: {
    resetContent() {
      this.content = {
        general: []
      }
    },
    renderSidebar(data) {
      if (Array.isArray(data)) {
        return data
          .map(file => {
            if (file.group) {
              if (!this.content[group]) {
                this.content[group] = []
              }
            }

            return file
          })
          .map(file => {
            if (file.group) {
              this.content[file.group].push(file)
            } else {
              this.content.general.push(file)
            }
          })
      }

      throw Error(`Variable ${data} is not Array type`)
    },
    searchContent(keyword) {
      if (keyword.length > 0) {
        this.resetContent()
        const fuse = new Fuse(this.$context.content, this.searchOption)
  
        this.renderSidebar(fuse.search(keyword))
      } else {
        this.resetContent()
        this.renderSidebar(this.$context.content)
      }
    }
  }
}
</script>
