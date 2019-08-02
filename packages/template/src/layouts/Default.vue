<template>
  <article>
    <b-navbar toggleable="lg">
      <b-container>
        <b-navbar-brand to="/">
          {{ $static.metaData.siteName }}
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/documents">Documents</b-nav-item>
            <b-nav-item to="/schema">Schema</b-nav-item>
            <b-nav-item to="/components">Components</b-nav-item>
            <b-nav-item to="/routes">Routes</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
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

<style>
  .navbar {
    background-color: red;
  }
</style>
