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
            class="materialize-textarea"
          ></textarea>
          <label for="desc">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px"
            >{{ desc.length }}/1024</span
          >
        </div>

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
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        desc: this.desc,
        id: Date.now(),
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date,
      };

      console.log(this.chips.chipsData);
      this.$store.dispatch("createTask", task);
      this.$router.push("/list");
    },
  },
  unmounted() {
    if (this.date && this.date.destroy) {
      this.date.destroy;
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy;
    }
  },
};
</script>
