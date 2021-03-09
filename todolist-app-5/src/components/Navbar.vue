<template>
  <!-- <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo center">Logo</a>
      <ul class="left hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li class="active"><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav> -->
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