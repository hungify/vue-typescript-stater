<script setup lang="ts">
import IMAGES from '#/assets'
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <img :src="IMAGES.logo" class="logo vue" alt="Vue logo" />
      </a>
    </header>
    <HelloWorld msg="Vue Typescript !" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  height: 10em;
  padding: 1.5em;
  will-change: filter;
}
.logo.vite:hover {
  filter: drop-shadow(0 0 2em var(--color-vite));
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em var(--color-vue));
}
.wrapper {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .wrapper {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .wrapper main {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
