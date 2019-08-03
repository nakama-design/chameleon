<template>
  <div class="heading">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => 'Heading'
    }
  }
}
</script>


<style lang="scss">
  .heading {
    @include font-quicksands-medium;

    padding: 46px 0 36px 0;
    font-size: 22px;
    line-height: 27px;
    color: $blue;
    text-transform: uppercase;
  }
</style>
