<template>
  <b-card class="sidebar">
    <b-form-input
      placeholder="Search something ..."
      @input="searchKeyword"
    />
    <div class="sidebar-list" vertical>
      <div class="sidebar-list__title">
        <div>Pages</div>
        <b-nav vertical>
          <b-nav-item
            v-for="(child, index) in content"
            :key="index"
            class="sidebar-list__item"
            @click="$router.push(`/list/${child}`)"
          >
            {{ child }}
          </b-nav-item>
        </b-nav>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    content: {
      type: [Object, Array],
      default: () => []
    }
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
      margin-left: -5px;
    }
  }
}
</style>
