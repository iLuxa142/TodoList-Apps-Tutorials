<template>
  <div>
    <div class="row">
      <h3>List</h3>

      <div class="col l6">
        <span>Quick add task:</span>
        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model="addTaskTitle"
            @keyup.enter="quickAddTask"
          />
          <label for="title">Enter task title and press enter key</label>
        </div>

        <span>Toggle view style: </span>
        <a class="waves-effect waves-light btn" @click="toggleView">
          <i class="material-icons left">view_list</i>
          <i class="material-icons left">&sol; &nbsp; view_module</i>
        </a>
      </div>

      <div class="col l6">
        <p>
          <span>Filter by status:</span>
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
          <span>Filter by text (in title or description):</span>
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

      this.$store.dispatch("createTask", task);
      this.addTaskTitle = "";
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