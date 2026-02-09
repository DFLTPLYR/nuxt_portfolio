<script setup lang="ts">
useHead({
  titleTemplate: 'Jaycee.cloud',
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  opacity: 1;
}

.page-enter-from,
.page-leave-to {
  filter: grayscale(1);
  opacity: 0;
}
</style>
