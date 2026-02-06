<script setup lang="ts">
</script>

<template>
  <main class="max-w-screen-md mx-auto min-w-full grid gap-2 antialiased">
    <div class="w-full space-y-4 p-2 rounded-sm ">
      <header>
        <h1 class="text-lg font-mono text-white  flex flex-wrap flex-row gap-1">
          <span class="text-purple-300">const </span>
          <span class="text-red-400">name </span>
          <span class="text-white"> = </span>
          <span class="text-green-400">"John Cris"<span class="text-white">;</span></span>
          <span class="text-gray-400"> // 👋 Hi there</span>
        </h1>

        <p class="text-5xl font-semibold text-amber-100">
          Hi! My name's <span class="text-amber-300">John Cris</span>
          <span class="text-sm text-rose-400 block mt-1">// error: 'naem' is not defined in this template</span>
        </p>
      </header>

      <!-- Introduction -->
      <section class="my-8">
        <p class="text-lg leading-10 indent-8">
          I'm a junior full-stack programmer with a passion for building clean efficient, and meaningful software. I
          enjoy turning
          ideas into code and constantly learning new tools and technologies to improve my craft. Whether it’s working
          on the backend, creating user-friendly interfaces, or exploring new frameworks, I’m always excited to grow
          and
          take on new challenges.
          <CodeComment>TODO: get better at UI — wink wink 😉</CodeComment>
        </p>
      </section>

      <!-- TechStack -->
      <section class="my-8">
        <CodeComment>Tech Stack, I use <strike>Helix</strike> Vim btw</CodeComment>
        <h1 class="text-4xl font-semibold text-amber-200 mb-4">## Tools I work with</h1>
        <ul class="list-none list-inside text-lg leading-relaxed text-amber-100 space-y-4 mb-4">
          <li>Qml</li>
          <li>Opencode</li>
          <li>PHP / Laravel</li>
          <li>Electron</li>
          <li>Bash / Zsh / Fish
            <CodeComment>sometimes I write more shell than PHP 😅</CodeComment>
          </li>
          <li>JavaScript [object Object] / Typescript: any / Vue.js / Svelte / React (lil. bit) </li>
          <li>MySQL / SQLite / Supabase / Pocketbase
            <CodeComment>imagine not knowing SQL</CodeComment>
          </li>
          <li class="relative">Tailwind CSS
            <CodeComment>wait chatgpt-ing how to center a div</CodeComment>
          </li>
          <li class="-mx-3">CSS
            <CodeComment>i love css ❤️</CodeComment>
          </li>
          <li><strike>Docker</strike> Podman</li>
          <li>Git / GitHub </li>
          <li>Godot (for fun 🎮)</li>
          <li><strike>Rust (for fun 🦀)</strike></li>
        </ul>
        <CodeComment class="indent-8">btw, I use
          <strike>Windows microslop</strike>
          <span class="text-blue-400"> ARCH</span> GNU Linux BTW 😉
        </CodeComment>
        <br>
        <CodeComment class="indent-8">PS: on Wayland, of course. <strike>Hyprland</strike> Niri BTW.</CodeComment>
      </section>
    </div>
  </main>
</template>
