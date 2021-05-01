<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" type="text" v-model="title" />
          <label for="title">Title</label>
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea
            style="min-height: 150px"
            v-model="desc"
            id="desc"
            ref="desc"
            class="materialize-textarea"
            data-length="1000"
          ></textarea>
          <label for="desc">Description</label>
        </div>

        <ul ref="tabs" class="tabs">
          <li class="tab">
            <a class="active" href="#test-swipe-1">Notes (Markdown)</a>
          </li>
          <li class="tab"><a href="#test-swipe-2">Preview</a></li>
        </ul>
        <div id="test-swipe-1">
          <div class="input-field">
            <textarea
              v-model="notesMD"
              id="notes"
              ref="notes"
              class="materialize-textarea"
              data-length="1000"
            ></textarea>
            <label for="notes">Notes</label>
          </div>
        </div>
        <div id="test-swipe-2" :key="notesMD" v-markdown>{{ notesMD }}</div>

        <input type="text" ref="datepicker" />

        <div class="switch">
          <label>
            active
            <input type="checkbox" v-model="isCompleted" />
            <span class="lever"></span>
            completed
          </label>
        </div>
        <hr />
        <button class="btn" type="submit">Update</button>
        <button class="btn grey" type="button" @click="$router.go(-1)">
          Cancel
        </button>
        <button class="btn red" type="button" @click="deleteTask">
          Delete
        </button>
      </form>
    </div>
    <h5 v-else>Task not found!</h5>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data() {
    return {
      title: "",
      desc: "",
      notesMD: "",
      chips: null,
      date: null,
      isCompleted: false,
    };
  },
  mounted() {
    this.title = this.task.title;
    this.desc = this.task.desc;
    this.notesMD = this.task.notesMD;

    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.task.tags,
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });

    this.isCompleted = this.task.isCompleted;

    this.tabs = M.Tabs.init(this.$refs.tabs, {
      duration: 200,
      swipeable: false,
    });

    // M.updateTextFields();
    setTimeout(() => {
      M.updateTextFields();
      M.CharacterCounter.init(this.$refs.desc);
      M.CharacterCounter.init(this.$refs.notes);
      M.textareaAutoResize(this.$refs.desc);
      M.textareaAutoResize(this.$refs.notes);
    }, 0);
  },
  methods: {
    submitHandler() {
      let newStatus = this.isCompleted
        ? "completed"
        : new Date(this.date.date) < new Date()
        ? "outdated"
        : "active";

      this.$store.dispatch("updateTask", {
        id: this.task.id,
        title: this.title,
        desc: this.desc,
        notesMD: this.notesMD,
        status: newStatus,
        isCompleted: this.isCompleted,
        tags: this.chips.chipsData,
        date: this.date.date,
      });
      this.$router.go(-1);
    },

    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
      this.$router.go(-1);
    },
  },
  unmounted() {
    if (this.date) {
      this.date.destroy();
    }

    if (this.chips) {
      this.chips.destroy();
    }

    if (this.tabs) {
      this.tabs.destroy();
    }
  },
};
</script>

<style>
button {
  margin-right: 1rem;
}
</style>