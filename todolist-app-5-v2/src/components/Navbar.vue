<template>
  <div>
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <ul>
          <li>
            <a href="#" @click.prevent="openSidenav">Lists</a>
          </li>
          <li>
            <router-link to="/all-tasks/" active-class="active">
              All tasks
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <a href="#" data-target="slide-out" class="sidenav-trigger"
      ><i class="material-icons">menu</i></a
    >
    <ul id="slide-out" class="sidenav">
      <li><a class="subheader">Lists:</a></li>
      <li v-for="list of lists" :key="list.id">
        <router-link :to="'/list/' + list.id" active-class="active">
          <i class="small material-icons">{{ list.icon }}</i>
          {{ list.title }}
        </router-link>
      </li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">All tasks:</a></li>
      <li>
        <router-link to="/all-tasks/" active-class="active">
          All tasks
        </router-link>
      </li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Add new list:</a></li>
      <li>
        <div class="input-field" style="margin: 0px 10px">
          <input
            id="listtitle"
            ref="listtitle"
            type="text"
            data-length="20"
            v-model="addListTitle"
            @keyup.enter="createList"
          />
          <label for="listtitle">Title (maximum of 20 characters)</label>
          <a class="waves-effect waves-light btn-small" @click="createList"
            >add</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidenav: null,
      sidenav2: null,
      addListTitle: "",
    };
  },
  computed: {
    lists() {
      return this.$store.getters.lists;
    },
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function () {
      var elem = document.querySelector(".sidenav");
      this.sidenav = M.Sidenav.init(elem);
      console.log(this.sidenav);
    });

    setTimeout(() => {
      M.updateTextFields();
      M.CharacterCounter.init(this.$refs.listtitle);
    }, 0);
  },
  unmounted() {
    if (this.sidenav) {
      this.sidenav.destroy();
    }
  },
  methods: {
    openSidenav() {
      var elem = document.querySelector(".sidenav");
      this.sidenav = M.Sidenav.getInstance(elem);
      console.log(this.sidenav);
      this.sidenav.open();
    },
    createList() {
      if (this.addListTitle == "" || this.addListTitle.length > 20) return;

      const list = {
        id: Date.now(),
        title: this.addListTitle,
        icon: "fiber_new",
        tasks: [],
      };

      this.$store.dispatch("createList", list);
      this.addListTitle = "";
    },
  },
};
</script>

<style>
nav {
  padding: 0 2rem;
}
</style>