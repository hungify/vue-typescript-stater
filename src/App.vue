<script setup lang="ts">
const route = useRoute();

const currentLayout = computed(() => {
  return route?.meta?.layout ?? 'Default';
});
</script>

<template>
  <Component :is="currentLayout">
    <RouterView />
  </Component>
</template>
