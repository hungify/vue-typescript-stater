<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer"
        >Vite</a
      >
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer"
        >Vue 3</a
      >. What's next?
    </h3>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
</style>
