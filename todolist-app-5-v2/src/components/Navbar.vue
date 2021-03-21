<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Tasks</router-link>
      <ul class="right">
        <li><router-link to="/" exact active-class="active"><a href="#">Create</a></router-link></li>
        <li><router-link to="/list" active-class="active"><a href="#">List</a></router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
  nav {
    padding: 0 2rem;
  }
</style>