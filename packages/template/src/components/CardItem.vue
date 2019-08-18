<template>
  <b-card @click="$router.push(`/detail/${data.type.toLowerCase()}-${data.id}`)">
    <div class="card-action">
      <ArrowRightIcon />
    </div>
    <div class="card-heading">
      <div
        v-for="(value, key) in fields[data.type.toLowerCase()]"
        :key="key"
        class="card-item"
      >
        <div v-if="key === 'size'">
          <div class="card-item_title">
            {{ value }}
          </div>
          <div class="card-item_description">
            {{ toByte(data[key]) }}
          </div>
        </div>
        <div v-else-if="key === 'created'">
          <div class="card-item_title">
            {{ value }}
          </div>
          <div class="card-item_description">
            {{ toDate(data[key]) }}
          </div>
        </div>
        <div v-else>
          <div class="card-item_title">
            {{ value }}
          </div>
          <div class="card-item_description">
            {{ data[key] }}
          </div>
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
import bytes from 'bytes';
import dayjs, { Dayjs } from 'dayjs';

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
