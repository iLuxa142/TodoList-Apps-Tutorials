<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            id="title"
            type="text"
            class="validate"
            required
          />
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea
            v-model="desc"
            id="desc"
            ref="desc"
            class="materialize-textarea"
            data-length="1000"
          ></textarea>
          <label for="desc">Description</label>
        </div>

        <ul ref="tabs" class="tabs">
          <li class="tab col s3">
            <a class="active" href="#test-swipe-1">Notes (Markdown)</a>
          </li>
          <li class="tab col s3"><a href="#test-swipe-2">Preview</a></li>
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
        <div id="test-swipe-2" v-markdown>{{ notesMD }}</div>

        <input type="text" ref="datepicker" />

        <button class="btn" type="submit">Create Task</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      desc: "",
      notesMD: "",
      title: "",
      chips: null,
      date: null,
    };
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });

    this.tabs = M.Tabs.init(this.$refs.tabs, {
      duration: 200,
      swipeable: false,
    });

    M.CharacterCounter.init(this.$refs.desc);
    M.CharacterCounter.init(this.$refs.notes);
  },
  methods: {
    submitHandler() {
      const task = {
        id: Date.now(),
        title: this.title,
        desc: this.desc,
        notesMD: this.notesMD,
        status: "active",
        isCompleted: false,
        tags: this.chips.chipsData,
        date: this.date.date,
      };

      console.log(this.chips.chipsData);
      this.$store.dispatch("createTask", task);
      this.$router.push("/");
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
