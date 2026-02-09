<script setup lang="ts">
const nav = [
  {
    label: "about me", to: "/"
  },
  {
    label: "projects", to: "/projects"
  }
]
</script>

<template>
  <nav class="w-full flex flex-row gap-10 m-1">
    <template v-for="pages in nav">
      <NuxtLink :to="pages.to" :prefetch="true">
        {{ pages.label }}
      </NuxtLink>
    </template>
  </nav>
</template>
