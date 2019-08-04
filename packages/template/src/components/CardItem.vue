<template>
  <b-card
    role="tab"
    :class="{
      'card-maximize': full
    }"
  >
    <div class="card-action">
      <div
        class="card-action_button"
        @click="changeSize"
      >
        <Maximize2Icon v-if="!full" />
        <Minimize2Icon v-else />
      </div>
    </div>
    <div
      class="card-heading"
      :class="visible ? 'collapsed' : null"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="changeVisible"
    >
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
    <b-collapse
      :id="index.toString()"
      v-model="visible"
      accordion="accordions"
      role="tabpanel"
    >
      <div class="card-body">
        <!-- Wrapper for Component -->
        <CardComponent
          v-if="data.type.toLowerCase() === 'components'"
          :data="data"
        />
        <!-- Wrapper for Markdown -->
        <CardMarkdown
          v-if="data.type.toLowerCase() === 'documents'"
          :data="data"
        />
        <!-- Wrapper for Repl -->
        <CardRepl
          v-if="data.type.toLowerCase() === 'routes'"
          :data="data"
        />
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
import { Maximize2Icon, Minimize2Icon } from 'vue-feather-icons'
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
    Maximize2Icon,
    Minimize2Icon
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
