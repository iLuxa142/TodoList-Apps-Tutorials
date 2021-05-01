<template>
  <div>
    <div v-if="list">
      <div class="row">
        <h3>
          <i class="small material-icons">{{ list.icon }}</i> {{ list.title }}
          <button class="btn btn-small" @click="renameList">
            <i class="small material-icons">edit</i>
          </button>
        </h3>

        <div class="col l6" v-if="$route.name != 'all-tasks'">
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

          <strong>Toggle view style: </strong>
          <a class="waves-effect waves-light btn" @click="toggleView">
            <i class="material-icons left">view_list</i>
            <i class="material-icons left">&sol; &nbsp; view_module</i>
          </a>
        </div>

        <div class="col l6">
          <p>
            <strong>Filter by status:</strong>
            <button class="btn btn-small" @click="changeFilter('')">All</button>
            <button class="btn btn-small" @click="changeFilter('active')">
              Active
            </button>
            <button class="btn btn-small" @click="changeFilter('outdated')">
              Outdated
            </button>
            <button class="btn btn-small" @click="changeFilter('completed')">
              Completed
            </button>
          </p>
          <div>
            <strong>Filter by text (in title or description):</strong>
            <div class="input-field">
              <input id="filter" type="text" v-model="filterText" />
              <label for="filter">Enter text for search/filter</label>
            </div>
          </div>
        </div>
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
      const newTitle = prompt("Enter new title:", this.list.title);

      if (newTitle === this.list.title || newTitle.trim() === "") return;

      this.$store.dispatch("renameList", {
        id: this.$route.params.id,
        title: newTitle,
      });
    },

    changeFilter(filter) {
      this.filterStatus = filter;
    },

    toggleView() {
      this.isCardsView = !this.isCardsView;
    },
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>