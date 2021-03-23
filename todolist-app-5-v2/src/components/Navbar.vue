<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper">
      <ul class="right">
        <li>
          <router-link to="/" exact active-class="active">
            <i class="small material-icons" title="create task">add_box</i>
          </router-link>
        </li>
        <li>
          <router-link to="/list" active-class="active">
            Tasks list
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
nav {
  padding: 0 2rem;
}
</style>