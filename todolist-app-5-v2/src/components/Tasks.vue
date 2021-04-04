<template>
  <div class="row">
    <div v-if="tasks.length">
      <div v-if="viewStyle">
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
                  :checked="task.isCompleted"
                  @click="toggleCompleteStatus(task.id)"
                />
                <span></span>
              </label>
              <span>{{ task.title }}</span>
              <i class="material-icons right">more_vert</i>
            </span>
            <p>
              Date: {{ new Date(task.date).toLocaleDateString() }} &nbsp;|&nbsp;
              Tags: {{ task.tags.length }}
            </p>
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
            <div class="input-field">
              <textarea
                disabled
                style="min-height: 150px"
                :value="task.desc"
                id="desc"
                class="materialize-textarea"
              ></textarea>
              <span
                class="character-counter"
                style="float: right; font-size: 12px"
              >
                {{ task.desc.length }}/1024
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Table View -->
        <table class="tasks">
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
                    :checked="task.isCompleted"
                    @click="toggleCompleteStatus(task.id)"
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
      </div>
    </div>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  props: {
    viewStyle: {
      type: Boolean,
      default: false,
    },

    filter: {
      type: String,
      default: "",
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
  methods: {
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },

    toggleCompleteStatus(id) {
      this.$store.dispatch("toggleCompleteStatus", id);
    },
  },
};
</script>

<style>
.tasks tr:hover {
  background-color: lightgreen;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>