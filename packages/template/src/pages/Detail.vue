<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <b-card>
          <div class="card-action">
            <div
              class="card-action_button"
              @click="$router.push(`/list/${$context.content.type.toLowerCase()}`)"
            >
              <ArrowLeftIcon />
            </div>
          </div>
          <div class="card-heading">
            <div
              v-for="(value, key) in fields[$context.content.type.toLowerCase()]"
              :key="key"
              class="card-item"
            >
              <div class="card-item_title">
                {{ value }}
              </div>
              <div class="card-item_description">
                {{ $context.content[key] }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <!-- Wrapper for Component -->
            <CardComponent
              v-if="$context.content.type.toLowerCase() === 'components'"
              :data="$context.content"
            />
            <!-- Wrapper for Markdown -->
            <CardMarkdown
              v-if="$context.content.type.toLowerCase() === 'documents'"
              :data="$context.content"
            />
            <!-- Wrapper for Repl -->
            <CardRepl
              v-if="$context.content.type.toLowerCase() === 'routes'"
              :data="$context.content"
            />
          </div>
        </b-card>
      </div>
    </div>
  </Layout>
</template>

<script>

import { ArrowLeftIcon } from 'vue-feather-icons';
import CardComponent from '@/components/CardComponent.vue'
import CardMarkdown from '@/components/CardMarkdown.vue'
import CardRepl from '@/components/CardRepl.vue'

export default {
  components: {
    CardComponent,
    CardMarkdown,
    CardRepl,
    ArrowLeftIcon
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
  }
}
</script>
