<script setup lang="ts">
import { onMounted, ref } from 'vue';
const commited = ref();

onMounted(async () => {
  console.log('test')
})
</script>

<template>
  <footer class="w-full m-1">
    {{ `${new Date().getFullYear()}` }}
    Commits: <span class="text-green-400">{{ commited?.total }}</span> (and counting 💪)
  </footer>
</template>
