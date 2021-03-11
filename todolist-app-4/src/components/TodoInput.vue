<template>
  <div>
    <div class="row">
      <input
        @change="todoTextChange"
        :value="todoText"
        type="text"
        class="col form-control mr-2"
      />
      <button @click="addTodoI" class="btn btn-primary">Add</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { v1 } from "uuid";

export default {
  data() {
    return {
      todoText: ""
    };
  },
  methods: {
    ...mapActions(["addTodo"]),

    todoTextChange(e) {
      this.todoText = e.target.value;
    },

    addTodoI() {
      this.addTodo({
        id: v1(),
        title: this.todoText
      });

      this.todoText = "";
    }
  }
};
</script>

<style></style>
