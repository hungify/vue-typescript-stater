<script setup lang="ts">
import type { PostOutput } from '#/types/post'
import { postService } from '#/services/post'

const post = ref<PostOutput.Post>()

const route = useRoute()

onMounted(async () => {
  if ('id' in route.params) {
    const [err, data] = await toPromise(
      postService.getPost(Number(route.params.id)),
    )
    if (!err) {
      post.value = data
    }
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
