<script setup lang="ts">
</script>

<template>
  <main id="About" class="max-w-3xl mx-auto min-w-full grid gap-2 antialiased">
    <div class="w-full space-y-4 p-2 rounded-sm ">
      <header>

        <h1 class="text-4xl font-semibold text-amber-200 mb-4">## About</h1>

        <h1 class="text-lg font-mono text-white  flex flex-wrap flex-row gap-1">
          <span class="text-purple-300">const </span>
          <span class="text-red-400">name </span>
          <span class="text-white"> = </span>
          <span class="text-green-400">"john cris"<span class="text-white">;</span></span>
          <span class="text-gray-400"> // 👋 hi there</span>
        </h1>


        <p class="text-5xl font-semibold text-amber-100">
          hi! my name's <span class="text-amber-300">john cris</span>
          <span class="text-sm text-rose-400 block mt-1">// error: 'naem' is not defined in this template</span>
        </p>
      </header>

      <!-- Introduction -->
      <section class="my-8">
        <p class="text-lg leading-10 indent-8">
          i'm a full-stack programmer with a passion for building clean efficient, and meaningful software. i
          enjoy turning
          ideas into code and constantly learning new tools and technologies to improve my craft. whether it’s working
          on the backend, creating user-friendly interfaces, or exploring new frameworks, i’m always excited to grow
          and
          take on new challenges.
          <CodeComment>todo: get better at ui — wink wink 😉</CodeComment>
        </p>
      </section>

      <!-- TechStack -->
      <section class="my-8">
        <CodeComment>
          Tech Stack or Tools...tomato tomato same same :D, I use
          <span class="line-through">VsCode</span>,
          <span class="line-through">Helix</span> Vim btw
        </CodeComment>

        <h1 class="text-4xl font-semibold text-amber-200 mb-4">## Tools I work with</h1>

        <!-- Grouped by category -->
        <div class="space-y-6">
          <!-- Languages -->
          <div>
            <h2 class="text-xl text-amber-300 mb-2">// Languages</h2>
            <ul class="list-none text-lg text-amber-100 space-y-2">
              <li>JavaScript [object Object] / TypeScript: any</li>
              <li>PHP: lambo</li>
              <li>Bash / Zsh / Fish <CodeComment>sometimes I write more shell than PHP 😅</CodeComment>
              </li>
              <li><span class="line-through">Rust (for fun 🦀) </span>
                <CodeComment> watched some 100seconds of rust and time to update the portfolio</CodeComment>
              </li>
              <li>GdScript</li>
              <li>QML</li>
            </ul>
          </div>
          <!-- Frameworks -->
          <div>
            <h2 class="text-xl text-amber-300 mb-2">// Frameworks & Libraries</h2>
            <ul class="list-none text-lg text-amber-100 space-y-2">
              <li>Vue.js / Svelte / React (lil. bit)</li>
              <li>Laravel</li>
              <li>Electron</li>
              <li>Capacitorjs <CodeComment>i swear ill learn mobile development</CodeComment>
              </li>
              <li class="-mx-2">CSS <CodeComment>i love css ❤️</CodeComment>
              </li>
              <li>Tailwind CSS <CodeComment>wait chatgpt-ing how to center a div</CodeComment>
              </li>
            </ul>
          </div>
          <!-- Tools -->
          <div>
            <h2 class="text-xl text-amber-300 mb-2">// Tools</h2>
            <ul class="list-none text-lg text-amber-100 space-y-2">
              <li><span class="line-through">Docker</span> Podman</li>
              <li>Git / GitHub </li>
              <li>Opencode</li>
              <li>Godot (for fun 🎮)</li>
            </ul>
          </div>
          <!-- Databases -->
          <div>
            <h2 class="text-xl text-amber-300 mb-2">// Databases</h2>
            <ul class="list-none text-lg text-amber-100 space-y-2">
              <li>MySQL <CodeComment>imagine not knowing SQL</CodeComment>
              </li>
              <li>SQLite</li>
              <li>PostgreSQL</li>
              <li>Convex</li>
              <li>Supabase / Pocketbase</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 space-y-2">
          <CodeComment class="indent-8">
            btw, I use <span class="line-through">Windows microslop</span> &nbsp
            <span class="text-blue-400">ARCH</span> GNU Linux BTW 😉
          </CodeComment>
          <CodeComment class="indent-8">
            PS: on Wayland, of course. <span class="line-through">Hyprland</span> Niri BTW.
          </CodeComment>
        </div>
      </section>
    </div>
  </main>
</template>
