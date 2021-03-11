<template>
  <div>
    <div class="row my-3 justify-content-between">
      <h3 v-if="!editing">{{ todo.title }}</h3>
      <input
        v-else
        :value="todoText"
        @change="todoTextChange"
        type="text"
        class="col form-control"
      />
      <div>
        <button @click="updateTodoI(todo)" class="btn btn-primary mx-2">
          {{ editing ? "Update" : "Edit" }}
        </button>
        <button @click="deleteTodo(todo.id)" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    todo: {}
  },
  data() {
    return {
      todoText: "",
      editing: false
    };
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),

    updateTodoI(todo) {
      this.editing = !this.editing;

      if (this.editing) {
        this.todoText = todo.title;
        this.updateTodo(todo);
      } else {
        todo.title = this.todoText;
      }
    },

    todoTextChange(e) {
      this.todoText = e.target.value;
    }
  }
};
</script>

<style></style>
