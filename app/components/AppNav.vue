<script setup lang="ts">
const nav = [
  {
    label: "home", to: "/"
  },
  {
    label: "about", to: "/about"
  },
  {
    label: "projects", to: "/projects"
  }
]
</script>

<template>
  <nav class="w-full flex flex-row gap-10 m-1">
    <template v-for="pages in nav">
      <NuxtLink :to="pages.to">
        {{ pages.label }}
      </NuxtLink>
    </template>
  </nav>
</template>
