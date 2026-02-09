<script setup lang="ts">
const { data, pending } = useFetch("/api/projects")
</script>
<template>
  <div>Currently working on {{ data?.length }} <CodeComment v-if=!pending>not really just some</CodeComment>
  </div>
  <div class="flex flex-col space-y-4">
    <template v-if=pending>
      <div>Loading...</div>
    </template>
    <template v-else>
      <NuxtLink :to="proj.description ? `projects/${proj.name}` : proj.html_url"
        class="border flex flex-col p-2 rounded-sm" v-for="proj in data">
        <h1 class="text-4xl"> {{ proj.name }} </h1>
        <div class="flex flex-row space-x-1" v-if="proj.languages.length > 0">
          <p class="px-2 py-1 mt-5 rounded-xs w-fit" :style="{ backgroundColor: lang.color, color: lang.textColor }"
            v-for="lang in proj.languages">
            {{ lang.name }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>
