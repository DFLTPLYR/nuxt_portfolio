<script setup lang="ts">
import projects from '~~/server/api/projects';


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
      <div class="border flex flex-col p-2 rounded-sm" v-for="proj in data">
        <h1> {{ proj.name }} </h1>

        <div class="flex flex-row space-x-1">
          <p class="px-2 py-1 bg-green-950 rounded-xs w-fit" v-for="lang in Object.keys(proj.languages)">
            {{ lang }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
