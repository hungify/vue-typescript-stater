<script setup lang="ts">
import { useImmer } from '~/composables/useImmer';

const [count, setCount] = useImmer({
  nested: { count: 0 },
});

const handleIncrease = () => {
  setCount((draft) => {
    draft.nested.count += 1;
  });
};
</script>

<template>
  <div class="about">
    <h1>Reduce Reactivity Overhead</h1>
    <button @click="handleIncrease">Count is {{ count.nested.count }}</button>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: Default
</route>
