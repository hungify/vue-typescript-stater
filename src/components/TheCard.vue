<script lang="ts" setup>
interface Props {
  id: number
  title: string
  body: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img
        class="rounded-t-lg"
        src="https://plus.unsplash.com/premium_photo-1706430116060-4055d33e5f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt=""
      />
    </a>
    <div class="p-5">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ body }}
      </p>
    </div>
  </div>
</template>
