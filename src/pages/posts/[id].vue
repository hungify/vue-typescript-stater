<script setup lang="ts">
import { PostService } from '#/services/post'
import type { Post } from '#/types/post'

const post = ref<Post>()

const route = useRoute()

onMounted(async () => {
  const postService = new PostService()
  if (route.params.id) {
    const data = await postService.getPost(Number(route.params.id))
    post.value = data
  }
})
</script>

<template>
  <div v-if="post">
    <h4>{{ post.title }}</h4>
    <p>{{ post.id }}</p>
    <p>{{ post.userId }}</p>
  </div>
  <div v-else>
    <p>Post not found</p>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: Default
</route>
