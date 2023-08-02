<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main>
    <RouterView />
    <div>
      <button @click="router.back()">Go back</button>
    </div>
    <div>[Default Layout]</div>
  </main>
</template>
