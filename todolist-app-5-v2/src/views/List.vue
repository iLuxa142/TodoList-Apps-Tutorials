<template>
  <div class="row">
    <div class="input-field col s6">
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

      <hr />
      <h3>List</h3>

      <span>Filter by status:</span>
      <button class="btn btn-small" @click="changeFilter(null)">
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
    </div>
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th><i class="tiny material-icons">check</i></th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task of displayTasks"
          :key="task.id"
          @dblclick="$router.push('/task/' + task.id)"
        >
          <td>
            <label>
              <input
                type="checkbox"
                class="filled-in"
                :checked="task.status == 'completed'"
              />
              <span></span>
            </label>
          </td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td>
            <div class="text">{{ task.desc }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              Edit
            </router-link>
          </td>
          <td>
            <button class="btn btn-small red" @click="deleteTask(task.id)">
              del
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTaskTitle: "",
      filter: null,
    };
  },
  methods: {
    quickAddTask() {
      const task = {
        title: this.addTaskTitle,
        desc: "",
        id: Date.now(),
        status: "active",
        tags: "",
        date: Date.now(),
      };

      this.$store.dispatch("createTask", task);
      this.addTaskTitle = "";
    },

    changeFilter(filter) {
      this.filter = filter;
    },

    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },

    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }

        return t.status === this.filter;
      });
    },
  },
};
</script>

<style>
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
button {
  margin-left: 5px;
}
</style>