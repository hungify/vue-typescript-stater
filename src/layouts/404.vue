<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main
    px-4
    py-10
    text="center gray-700 dark:gray-200"
    flex
    justify-between
    items-center
    flex-col
    h-screen
  >
    <div my-a>
      <RouterView />
      <button mt-5 @click="router.back()">Go back</button>
    </div>
    <div mt-5 text-center text-sm opacity-50 col-start-1 col-end--1>
      [404 Layout]
    </div>
  </main>
</template>
