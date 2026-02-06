<template>
  <code class="text-sm text-gray-400 font-mono inline-block">//
    <slot />
  </code>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CodeComment'
})
</script>
