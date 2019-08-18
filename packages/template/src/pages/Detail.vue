<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="btn btn-link mb-4" @click="$router.back()">
          <ArrowLeftIcon /> Back
        </div>
        <b-card>
          <div class="card-heading">
            <div
              v-for="(value, key) in fields[$context.content.type.toLowerCase()]"
              :key="key"
              class="card-item"
            >
              <div v-if="key === 'size'">
                <div class="card-item_title">
                  {{ value }}
                </div>
                <div class="card-item_description">
                  {{ toByte($context.content[key]) }}
                </div>
              </div>
              <div v-else-if="key === 'created'">
                <div class="card-item_title">
                  {{ value }}
                </div>
                <div class="card-item_description">
                  {{ toDate($context.content[key]) }}
                </div>
              </div>
              <div v-else>
                <div class="card-item_title">
                  {{ value }}
                </div>
                <div class="card-item_description">
                  {{ $context.content[key] }}
                </div>
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
import bytes from 'bytes';
import dayjs, { Dayjs } from 'dayjs';

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
          name: 'Name',
          type: 'Type',
          size: 'Size',
          created: 'Created At'
        }
      }
    }
  },
  methods: {
    toByte(num) {
      return bytes(num);
    },
    toDate(num) {
      return dayjs.unix(num / 1000).format('MM-DD-YYYY HH:mm');
    }
  }
}
</script>
