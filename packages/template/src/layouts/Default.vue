<template>
  <article
    :class="{
      'dark-mode': checked
    }"
  >
    <b-navbar toggleable="lg">
      <b-container>
        <b-navbar-brand to="/">
          {{ $static.metaData.siteName }}
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item v-if="documentsEnable" to="/documents">Documents</b-nav-item>
            <b-nav-item v-if="componentsEnable" to="/components">Components</b-nav-item>
            <b-nav-item v-if="routesEnable" to="/routes">Routes</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
            <b-form-checkbox v-model="checked" name="check-button" switch>
              {{ checked ? 'Dark Mode' : 'Light Mode' }}
            </b-form-checkbox>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container>
      <slot/>
    </b-container>
  </article>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
import Components from '@/data/components.json'
import Documents from '@/data/documents.json'
import Routes from '@/data/routes.json'

export default {
  data() {
    return {
      checked: false,
      documentsEnable: false,
      componentsEnable: false,
      routesEnable: false
    }
  },
  mounted() {
    if (Components.components.length > 0) {
      this.componentsEnable = true
    }

    if (Documents.documents.length > 0) {
      this.documentsEnable = true
    }

    if (Routes.routes.length > 0) {
      this.routesEnable = true
    }
  }
}
</script>


<style lang="scss">
  article {
    min-height: 100vh;
    transition: all .3s ease-in-out;
    padding-bottom: 40px;
  }
  .navbar {
    transition: all .3s ease-in-out;
    box-shadow: 0px 8px 18px rgba(73, 116, 130, 0.07);

    .nav {
      &-link {
        padding: 10px;
      }
      &-item {
        padding: 12px 6px;
      }
    }
    .custom-switch {
      display: flex;
      align-items: center;
      padding: 12px;
      padding-left: 48px;
    }
  }
  .navbar-light .navbar-brand {
    font-family: 'Lobster Two';
    color: $purple;
    font-size: 28px;
  }
  .dark-mode {
    background: rgb(6, 9, 29);
    color: $grey;

    .navbar {
      background: $dark-mode;
      box-shadow: 0px 8px 18px rgba(73, 116, 130, 0.07);

      &-brand,
      .nav-link,
      .custom-switch label {
        color: $grey;
      }
      &-brand:hover,
      .nav-link:hover {
        color: $white;
      }
    }
  }
</style>
