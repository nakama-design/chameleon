<template>
  <b-card role="tab">
    <div class="card-action">
      <div
        class="card-action_button"
        @click="$router.push(`/detail/${data.type.toLowerCase()}-${data.id}`)"
      >
        <ArrowRightIcon />
      </div>
    </div>
    <div class="card-heading">
      <div
        v-for="(value, key) in fields[data.type.toLowerCase()]"
        :key="key"
        class="card-item"
      >
        <div class="card-item_title">
          {{ value }}
        </div>
        <div class="card-item_description">
          {{ data[key] }}
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'
import CardComponent from '@/components/CardComponent.vue'
import CardMarkdown from '@/components/CardMarkdown.vue'
import CardRepl from '@/components/CardRepl.vue'

export default {
  props: {
    index: {
      type: [Number, String],
      default: () => ''
    },
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  components: {
    CardComponent,
    CardMarkdown,
    CardRepl,
    ArrowRightIcon
  },
  data() {
    return {
      visible: false,
      full: false,
      fields: {
        documents: {
          name: 'Document',
          type: 'Type',
          size: 'Size',
          created: 'Created At'
        },
        routes: {
          name: 'Name',
          type: 'Type',
          method: 'Method',
          path: 'Path'
        },
        components: {
          componentName: 'Name',
          type: 'Type',
          size: 'Size',
          created: 'Created At'
        }
      }
    }
  },
  methods: {
    changeVisible() {
      if (!this.full) {
        this.visible = !this.visible
      }
    },
    changeSize() {
      this.full = !this.full

      if (this.full) {
        this.visible = true
      }
    }
  }
}
</script>
