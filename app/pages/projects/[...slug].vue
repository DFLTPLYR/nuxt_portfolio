<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page, status } = await useAsyncData(route.path, async () => {
  await $fetch(`/api/content/${slug}`)
  const result = await queryCollection('content').path(`/${slug.toLowerCase()}`).first()
  return result || null
})

const pending = computed(() => status.value === 'pending')
</script>
<template>
  <nav class="mb-4">
    <NuxtLink to="/projects" class="relative group text-amber-100 hover:text-amber-300 transition-colors duration-300">
      <span class="flex items-center gap-1">
        <span class="transition-transform duration-300 group-hover:-translate-x-1"><-- </span> go back
            <span
              class="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span></span>
    </NuxtLink>
  </nav>
  <article>
    <ContentRenderer v-if="!pending && page" :value="page" />
  </article>
</template>
