<script setup lang="ts">
</script>

<template>
  <div
    class="min-h-dvh max-w-3xl transition-all duration-300 mx-auto px-4 w-full flex flex-col text-amber-100 py-2 md:py-20 select-none gap-10">
    <AppNav />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
