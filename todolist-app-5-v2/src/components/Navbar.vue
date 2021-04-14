<template>
  <div>
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <ul class="right">
          <li>
            <router-link to="/create" exact active-class="active">
              <i class="small material-icons" title="create task">add_box</i>
            </router-link>
          </li>
          <li>
            <router-link to="/" active-class="active"> Tasks list </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <ul id="slide-out" class="sidenav">
      <li><a class="subheader">List group 1</a></li>
      <li>
        <a class="waves-effect" href="#!"
          ><i class="small material-icons">fiber_new</i>List 1</a
        >
      </li>
      <li>
        <a href="#!"
          ><i class="small material-icons">monetization_on</i>Finance</a
        >
      </li>
      <li>
        <a href="#!"><i class="small material-icons">work</i>Work</a>
      </li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">List group 2</a></li>
      <li>
        <a class="waves-effect" href="#!"
          ><i class="small material-icons">assignment</i>Projects</a
        >
      </li>
      <li>
        <a href="#!"><i class="small material-icons">favorite</i>Health</a>
      </li>
      <li>
        <a href="#!"><i class="small material-icons">fiber_new</i>New list</a>
      </li>
      <li>
        <a href="#!"
          ><i class="small material-icons">add_shopping_cart</i>Shopping list</a
        >
      </li>
      <li>
        <a href="#!"><i class="small material-icons">home</i>Home</a>
      </li>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger"
      ><i class="material-icons">menu</i></a
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidenav: null,
    };
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      this.sidenav = M.Sidenav.init(elems);
    });
  },
  unmounted() {
    if (this.sidenav) {
      this.sidenav.destroy();
    }
  },
};
</script>

<style>
nav {
  padding: 0 2rem;
}
</style>