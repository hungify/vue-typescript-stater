<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <main class="default">
    <RouterView />
    <div>[Default Layout]</div>
  </main>
</template>
