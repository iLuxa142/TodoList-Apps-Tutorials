<template>
  <div>
    <p>Список задач ({{ this.todosCount }})</p>
  </div>
</template>

<script>
export default {
  props: ["todosCount"],
};
</script>