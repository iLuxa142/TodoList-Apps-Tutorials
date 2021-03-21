<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>

      <form @submit.prevent="submitHandler">

        <div class="chips" ref="chips"></div>

        <div class="input-field">
            <textarea style="min-height: 150px;" v-model="desc" id="desc" class="materialize-textarea"></textarea>
            <label for="desc">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{desc.length}}/1024</span>
        </div>

        <input type="text" ref="datepicker">

        <div v-if="task.status !== 'completed'">
          <button class="btn" type="submit" style="margin-right: 1rem;">Update</button>
          <button class="btn blue" type="button" @click="completeTask">Complete task</button>
        </div>
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
    }
  },
  data() {
    return {
      desc: '',
      chips: null,
      date: null
    }
  },
  mounted() {
    this.desc = this.task.desc;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.tags,
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });

    setTimeout(() => {M.updateTextFields()}, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        desc: this.desc,
        date: this.date.date
      });
      this.$router.push('/list');
    },

    completeTask() {
      this.$store.dispatch('completeTask', this.task.id);
      this.$router.push('/list');
    }
  },
  unmounted() {
    if (this.date && this.date.destroy) {
      this.date.destroy;
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy;
    }
  }
}
</script>

<style>

</style>