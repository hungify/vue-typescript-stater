<script lang="ts" setup></script>

<template>
  <div class="grid h-full" grid="cols-2">
    <TheHeader />
    <main px-4 py-10 text="center gray-700 dark:gray-200">
      <RouterView />
    </main>
    <div text-center text-sm opacity-50 col-start-1 col-end--1>
      [Default Layout]
    </div>
  </div>
</template>
