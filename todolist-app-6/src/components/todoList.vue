<template>
  <div>
    <div v-for="(todo, index) in todos" :key="todo.id">
      <p>
        <span class="todo__id">{{ index + 1 }}&nbsp;</span>
        <span
          class="todo__text"
          :class="{ todo__text_isShow: todo.isDone }"
          @dblclick="removeItem(index)"
        >
          {{ todo.text }}
        </span>
        <input v-model="todo.isDone" type="checkbox" class="todo__check" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: [Object],
      required: true,
    },
  },
  methods: {
    removeItem(index) {
      this.$emit("removeTodo", index);
    },
  },
};
</script>
