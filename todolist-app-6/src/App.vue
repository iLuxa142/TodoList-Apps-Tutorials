<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="todo">
      <!-- <p>{{ todo }}</p> -->
      <input v-model.trim="todo" type="text" placeholder="Enter todo title" />
      <button @click="addTodo">add</button>
      <todo-list :todos="todos" @removeTodo="removeTodo" />
      <hr />
      <todo-total :todosCount="todos.length" />
    </div>
  </div>
</template>

<script>
import todoList from "./components/todoList";
import todoTotal from "./components/todoTotal";
export default {
  components: {
    todoList,
    todoTotal,
  },
  name: "App",
  data() {
    return {
      title: "Todo App",
      todo: "",
      todos: [],
      id: 0,
    };
  },
  mounted() {
    const data = localStorage.getItem("todos");
    if (data) this.todos = JSON.parse(data);
  },
  methods: {
    addTodo() {
      if (this.todo == "") return;
      this.todos.push({
        id: this.id++,
        text: this.todo,
        isDone: false,
      });

      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.todo = "";
    },

    removeTodo(index) {
      this.todos.splice(index, 1);

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  text-align: center;
}
.todo {
  text-align: left;
  width: 300px;
  height: 100%;
  background: rgb(240, 212, 212);
  padding: 30px;
  outline: 1px solid #000;

  &__id {
    color: red;
    font-weight: bold;
  }

  &__text {
    font-size: 15px;
    color: #444;
    &_isShow {
      color: #ccc;
      text-decoration: line-through;
    }
  }

  &__check {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
