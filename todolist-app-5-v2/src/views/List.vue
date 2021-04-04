<template>
  <div>
    <div class="row">
      <div class="input-field col l6">
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

        <h3>List</h3>
        <span>Filter by status:</span>
        <button class="btn btn-small" @click="changeFilter('')">
          All (no filter)
        </button>
        <button class="btn btn-small" @click="changeFilter('active')">
          Active
        </button>
        <button class="btn btn-small" @click="changeFilter('outdated')">
          Outdated
        </button>
        <button class="btn btn-small" @click="changeFilter('completed')">
          Completed
        </button>

        <p>
          Toggle view style:
          <a class="waves-effect waves-light btn" @click="toggleView">
            <i class="material-icons left">view_list</i>
            <i class="material-icons left">&sol; &nbsp; view_module</i>
          </a>
        </p>
      </div>
    </div>

    <Tasks :filter="filter" :view-style="isCardsView" />
  </div>
</template>

<script>
import Tasks from "@/components/Tasks";
export default {
  data() {
    return {
      addTaskTitle: "",
      filter: null,
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
      this.filter = filter;
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