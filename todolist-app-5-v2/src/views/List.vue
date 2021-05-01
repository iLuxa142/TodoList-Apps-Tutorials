<template>
  <div>
    <div v-if="list">
      <div class="row">
        <h3>
          <i class="small material-icons">{{ list.icon }}</i>
          {{ list.title }}
          <span v-if="$route.name != 'all-tasks'">
            [{{ list.tasks.length }}]
            <button class="btn btn-small" @click="renameList">
              <i class="small material-icons">edit</i>
            </button>
            <button class="btn btn-small red" @click="deleteList">
              <i class="small material-icons">delete</i>
            </button>
          </span>
        </h3>

        <div class="col l6">
          <div v-if="$route.name != 'all-tasks'">
            <strong>Quick add task:</strong>
            <div class="input-field">
              <input
                id="title"
                type="text"
                v-model="addTaskTitle"
                @keyup.enter="quickAddTask"
              />
              <label for="title">Enter task title and press enter key</label>
            </div>
          </div>

          <strong>Toggle view style: </strong>
          <a class="waves-effect waves-light btn" @click="toggleView">
            <i class="material-icons left">view_list</i>
            <i class="material-icons left">&sol; &nbsp; view_module</i>
          </a>
        </div>

        <div class="col l6">
          <p>
            <strong>Filter by status: </strong>
            <a href="#" @click.prevent="changeFilter('')">All</a> |
            <a href="#" @click.prevent="changeFilter('active')">Active</a> |
            <a href="#" @click.prevent="changeFilter('outdated')">Outdated</a> |
            <a href="#" @click.prevent="changeFilter('completed')">Completed</a>
          </p>
          <div>
            <strong>Filter by text (in title or description):</strong>
            <div class="input-field">
              <input id="filter" type="text" v-model="filterText" />
              <label for="filter">Enter text for search/filter</label>
            </div>
          </div>
        </div>

        <strong>{{ currentFilters }}</strong>
      </div>
      <Tasks
        :filter-status="filterStatus"
        :filter-text="filterText"
        :view-style="isCardsView"
      />
    </div>
    <div v-else>List not found! Please select the list in the left panel.</div>
  </div>
</template>

<script>
import Tasks from "@/components/Tasks";
export default {
  data() {
    return {
      addTaskTitle: "",
      filterStatus: "",
      filterText: "",
      isCardsView: false,
    };
  },
  components: {
    Tasks,
  },
  computed: {
    list() {
      if (this.$route.name == "all-tasks")
        return { title: "All Tasks", icon: "format_list_bulleted" };
      else return this.$store.getters.listById(this.$route.params.id);
    },

    currentFilters() {
      return this.filterStatus || this.filterText
        ? `Current filters: ${this.filterStatus || "all"} ${
            !this.filterText ? "" : "+ text: " + this.filterText
          }`
        : "";
    },
  },
  methods: {
    quickAddTask() {
      const task = {
        title: this.addTaskTitle,
        desc: "",
        notesMD: "",
        id: Date.now(),
        status: "active",
        isCompleted: false,
        tags: "",
        date: Date.now(),
      };

      this.$store.dispatch("createTask", {
        listId: this.$route.params.id,
        task,
      });
      this.addTaskTitle = "";
    },

    renameList() {
      const newTitle = prompt(
        "Enter new title (maximum of 30 characters):",
        this.list.title
      );

      if (newTitle.length > 30) {
        alert("You input " + newTitle.length + " characters. Maximum - 30.");
      }

      if (
        newTitle === this.list.title ||
        newTitle.trim() === "" ||
        newTitle.length > 30
      ) {
        return;
      }

      this.$store.dispatch("renameList", {
        id: this.$route.params.id,
        title: newTitle,
      });
    },

    deleteList() {
      if (
        confirm(
          "Do you really want to delete this list? \
        \nTasks will remain in the general list (All tasks)."
        )
      ) {
        this.$store.dispatch("deleteList", this.$route.params.id);
        this.resetFilters();
        this.$router.push("/all-tasks/");
        M.toast({ html: "List deleted!", displayLength: 2000 });
      }
    },

    changeFilter(filter) {
      this.filterStatus = filter;
    },

    resetFilters() {
      this.filterStatus = "";
      this.filterText = "";
    },

    toggleView() {
      this.isCardsView = !this.isCardsView;
    },
  },
};
</script>

<style>
button {
  margin: 0px 3px;
}
</style>