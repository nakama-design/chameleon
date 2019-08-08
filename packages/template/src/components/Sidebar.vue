<template>
  <b-card class="sidebar">
    <b-form-input
      placeholder="Search something ..."
      @input="searchKeyword"
    />
    <div class="sidebar-list" vertical>
      <div
        v-for="(parent, title) in data"
        :key="title"
        class="sidebar-list__title"
      >
        {{ title }}
        <b-nav vertical>
          <b-nav-item
            v-for="(child, index) in parent"
            :key="index"
            class="sidebar-list__item"
          >
            {{ child.name }}
          </b-nav-item>
        </b-nav>
      </div>
    </div>
  </b-card>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'

export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  components: {
    ArrowRightIcon
  },
  methods: {
    searchKeyword(keyword) {
      this.$emit('search', keyword)
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  input {
    border: 0.5px solid #EAEAEA;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(229, 229, 229, 0.2);
    border-radius: 6px;
    padding: 14px 20px;
    height: auto;
  }
  &-list {
    padding: 20px 0;
    display: flex;
    flex-direction: columns;

    &__title {
      text-transform: uppercase;
      margin-bottom: 20px;
      font-weight: 500;
      color: #E0E0E0;
      font-size: 14px;
    }
    &__item {
      text-transform: capitalize;
      font-weight: 400;
      color: #E0E0E0;
      font-size: 16px;
    }
  }
}
</style>
