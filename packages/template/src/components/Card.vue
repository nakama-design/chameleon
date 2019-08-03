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
        <MaximizeIcon v-if="!full" />
        <MinimizeIcon v-else />
      </div>
    </div>
    <div
      class="card-heading"
      :class="visible ? 'collapsed' : null"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      <div class="card-item">
        <div class="card-item_title">
          name
        </div>
        <div class="card-item_description">
          Sample Name
        </div>
      </div>
      <div class="card-item">
        <div class="card-item_title">
          name
        </div>
        <div class="card-item_description">
          Sample Name
        </div>
      </div>
      <div class="card-item">
        <div class="card-item_title">
          name
        </div>
        <div class="card-item_description">
          Sample Name
        </div>
      </div>
    </div>
    <b-collapse
      :id="index"
      v-model="visible"
      accordion="accordions"
      role="tabpanel"
    >
      <div class="card-body">
        <CardComponent />
        <CardMarkdown />
        <CardSchema />
        <CardRepl />
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
import { MaximizeIcon, MinimizeIcon } from 'vue-feather-icons'
import CardComponent from '@/components/CardComponent.vue'
import CardMarkdown from '@/components/CardMarkdown.vue'
import CardSchema from '@/components/CardSchema.vue'
import CardRepl from '@/components/CardRepl.vue'

export default {
  props: {
    index: {
      type: [Number, String],
      default: () => 'X'
    }
  },
  components: {
    CardComponent,
    CardMarkdown,
    CardSchema,
    CardRepl,
    MaximizeIcon,
    MinimizeIcon
  },
  data() {
    return {
      visible: false,
      full: false,
      fields: [
        'name',
        'method',
        'group',
        'description'
      ]
    }
  },
  methods: {
    changeSize() {
      this.full = !this.full
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss">
  .card {
    border: 0.5px solid #EDEDED;
    box-sizing: border-box;
    box-shadow: 0px 8px 14px rgba(73, 116, 130, 0.05);
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;

    &-maximize {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      border: 0;
      border-radius: 0;
      z-index: 1000;

      .card-action {
        top: 5%;
        transform: translateY(0);
      }
    }
    &-action {
      position: absolute;
      top: 50%;
      right: 36px;
      transform: translateY(-50%);

      &_button {
        cursor: pointer;
      }
    }
    &-heading {
      display: flex;
      padding: 8px 18px;
      cursor: pointer;
    }
    &-item {
      margin-right: 24px;

      &:last-child {
        margin: 0;
      }
      &_title {
        @include font-quicksands-medium;

        font-size: 14px;
        color: $grey;
      }
      &_description {
        @include font-quicksands-medium;

        font-size: 16px;
        color: $dark-grey;
      }
    }
  }
  .dark-mode {
    .card {
      background: $dark-mode;
      border: 0.5px solid $dark-mode-border;

      &-action {
        &_button {
          color: $white;
        }
      }
      &-item {
        &_description {
          color: $white;
        }
      }
    }
  }
</style>
