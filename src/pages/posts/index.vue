<script setup lang="ts">
import type { PostOutput } from '#/types/post'
import { postService } from '#/services/post'

const posts = ref<PostOutput['Post'][]>([])

const router = useRouter()

onMounted(async () => {
  const [err, data] = await toPromise(postService.getPosts())
  if (!err) {
    posts.value = data
  }
})

const goToDetail = async (post: PostOutput['Post']) => {
  await router.push(`/posts/${encodeURIComponent(post.id)}`)
}
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <h4 @click="goToDetail(post)">{{ post.title }}</h4>
    <p>{{ post.id }}</p>
    <p>{{ post.userId }}</p>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: Default
</route>
