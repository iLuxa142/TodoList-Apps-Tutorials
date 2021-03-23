<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h4>{{ task.title }}</h4>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" type="text" v-model="title" />
          <label for="title">New title</label>
        </div>

        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            style="min-height: 150px"
            v-model="desc"
            id="desc"
            class="materialize-textarea"
          ></textarea>
          <label for="desc">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px">
            {{ desc.length }}/1024
          </span>
        </div>

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
        <button class="btn" type="submit" style="margin-right: 1rem">
          Update
        </button>
        <button class="btn red" type="button" @click="$router.push('/list')">
          Cancel
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
      chips: null,
      date: null,
      isCompleted: true,
    };
  },
  mounted() {
    this.title = this.task.title;
    this.desc = this.task.desc;

    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.task.tags,
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });

    if (this.task.status == "completed") {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      let newStatus = "active";
      if (new Date(this.date.date) < new Date()) {
        newStatus = "outdated";
      }
      if (this.isCompleted) {
        newStatus = "completed";
      }

      this.$store.dispatch("updateTask", {
        title: this.title,
        desc: this.desc,
        id: this.task.id,
        status: newStatus,
        tags: this.chips.chipsData,
        date: this.date.date,
      });
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

<style>
</style>