<script setup lang="ts">
const { data, pending } = await useFetch('/api/commits')
</script>

<template>
  <footer class="w-full m-1">
    {{ `${new Date().getFullYear()}` }}
    Commits: <span class="text-green-400">{{ pending ? "Wait" : data?.total ?? 0 }}</span> (and counting 💪)
  </footer>
</template>
