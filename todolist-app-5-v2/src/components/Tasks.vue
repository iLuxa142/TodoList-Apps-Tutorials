<template>
  <div class="row">
    <div v-if="tasks[0] != null">
      <div v-if="viewStyle">
        <!-- Cards View -->
        <div
          class="card col l3"
          style="margin: 5px"
          v-for="task of filteredTasks"
          :key="task.id"
          @dblclick="$router.push('/task/' + task.id)"
        >
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
              <i class="small material-icons">edit</i>
            </router-link>
            <button class="btn btn-small red" @click="deleteTask(task.id)">
              <i class="small material-icons">delete</i>
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
              <th>
                <a href="#" @click.prevent="setSortBy('title', $event)"
                  >Title</a
                >
              </th>
              <th>
                <a href="#" @click.prevent="setSortBy('desc', $event)"
                  >Description</a
                >
              </th>
              <th>Tags</th>
              <th>
                <a href="#" @click.prevent="setSortBy('date', $event)">Date</a>
              </th>
              <th>
                <a href="#" @click.prevent="setSortBy('status', $event)"
                  >Status</a
                >
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task of sortedTasks"
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
                  <i class="small material-icons">edit</i>
                </router-link>
                <button class="btn btn-small red" @click="deleteTask(task.id)">
                  <i class="small material-icons">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-else>No task in this list</p>
  </div>
</template>

<script>
export default {
  props: {
    viewStyle: {
      type: Boolean,
      default: false,
    },

    filterStatus: {
      type: String,
      default: "",
    },

    filterText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sortBy: "title",
      sortOrderAsc: true, // ascending or descending
    };
  },
  computed: {
    tasks() {
      if (this.$route.name == "all-tasks") return this.$store.getters.tasks;
      return this.$store.getters.tasksFromListId(this.$route.params.id);
    },

    filteredTasks() {
      return this.tasks.filter((t) => {
        return (
          (this.filterStatus != "" ? this.filterStatus == t.status : true) &&
          (this.filterText != ""
            ? t.title.includes(this.filterText) ||
              t.desc.includes(this.filterText)
            : true)
        );
      });
    },

    sortedTasks() {
      return this.filteredTasks.sort((a, b) => {
        var a1, b1;

        switch (this.sortBy) {
          case "title":
            a1 = a.title;
            b1 = b.title;
            break;
          case "desc":
            a1 = a.desc;
            b1 = b.desc;
            break;
          case "date":
            a1 = a.date;
            b1 = b.date;
            break;
          case "status":
            a1 = a.status;
            b1 = b.status;
            break;
          case "":
            return 0;
        }

        if (a1 == b1) {
          return 0;
        } else if (a1 < b1) {
          return this.sortOrderAsc ? 1 : -1;
        } else if (a1 > b1) {
          return this.sortOrderAsc ? -1 : 1;
        }
      });
    },
  },
  methods: {
    deleteTask(taskId) {
      this.$store.dispatch("deleteTask", taskId);
    },

    toggleCompleteStatus(id) {
      this.$store.dispatch("toggleCompleteStatus", id);
    },

    setSortBy(colum, event) {
      const columStr = event.target.innerText;
      const lastSymbol = columStr[columStr.length - 1];

      if (lastSymbol == "↓") {
        event.target.innerText = columStr.slice(0, -1) + "↑";
      } else if (lastSymbol == "↑") {
        event.target.innerText = columStr.slice(0, -1) + "↓";
      } else {
        event.target.innerText = columStr + "↓";
      }

      this.sortOrderAsc = colum == this.sortBy ? !this.sortOrderAsc : true;
      this.sortBy = colum;
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