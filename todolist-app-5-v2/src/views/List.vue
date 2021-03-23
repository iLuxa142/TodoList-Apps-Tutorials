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

        <p>
          Toggle view style:
          <a class="waves-effect waves-light btn" @click="toggleView">
            <i class="material-icons left">view_list</i>
            <i class="material-icons left">view_module</i>
          </a>
        </p>
      </div>
    </div>

    <div class="row">
      <div v-if="isCardsView">
        <div
          class="card col l3"
          style="margin: 5px"
          v-for="task of displayTasks"
          :key="task.id"
          @dblclick="$router.push('/task/' + task.id)"
        >
          <!-- Cards View -->
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              <label>
                <input
                  type="checkbox"
                  class="filled-in"
                  :checked="task.status == 'completed'"
                  @click="changeComplete(task.id)"
                />
                <span></span>
              </label>
              <span>{{ task.title }}</span>
              <i class="material-icons right">more_vert</i>
            </span>
            <p>Tags: {{ task.tags.length }}</p>
            <p>Date: {{ new Date(task.date).toLocaleDateString() }}</p>
            <p>Description:</p>
            <p class="text" style="width: 250px">
              {{ task.desc }}
            </p>

            <hr />
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              Edit
            </router-link>
            <button class="btn btn-small red" @click="deleteTask(task.id)">
              X
            </button>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              <i class="material-icons right">close</i>
            </span>
            <p>
              {{ task.desc }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Table View -->
        <table v-if="tasks.length" class="tasks">
          <thead>
            <tr>
              <th><i class="tiny material-icons">check</i></th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Date</th>
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
                    @click="changeComplete(task.id)"
                  />
                  <span></span>
                </label>
              </td>
              <td>{{ task.title }}</td>

              <td>
                <div class="text">{{ task.desc }}</div>
              </td>
              <td>
                {{ task.tags.length }}
              </td>
              <td>{{ new Date(task.date).toLocaleDateString() }}</td>
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
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No tasks</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTaskTitle: "",
      filter: null,
      isCardsView: false,
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

    changeComplete(id) {
      this.$store.dispatch("changeComplete", id);
    },

    toggleView() {
      this.isCardsView = !this.isCardsView;
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
.tasks tr:hover {
  background-color: lightgreen;
}
button {
  margin-left: 5px;
}
</style>