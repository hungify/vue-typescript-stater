<script setup lang="ts">
import { PostService } from '#/services/post';
import type { Post } from '#/types/post';

const posts = ref<Post[]>([]);

const router = useRouter();

onMounted(async () => {
  const postService = new PostService();
  const data = await postService.getPosts();
  posts.value = data;
});

const goToDetail = (post: Post) => {
  router.push(`/posts/${encodeURIComponent(post.id)}`);
};
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
