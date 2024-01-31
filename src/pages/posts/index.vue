<script setup lang="ts">
import type { PostOutput } from '#/types/post'
import { postService } from '#/services/post'

const posts = ref<PostOutput['Post'][]>([])

onMounted(async () => {
  const [err, data] = await toPromise(
    postService.getPosts({ _limit: 10, _start: 0 }),
  )
  if (!err) {
    posts.value = data
  }
})
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <RouterLink :to="`/posts/${post.id}`">{{ post.title }} </RouterLink>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: Default
</route>
