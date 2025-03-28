<script setup lang="ts">
import { Aperture } from "lucide-vue-next";
import scrollTo from "../../utils/root/scrollTo";
</script>
<template>
  <header class="absolute w-full">
    <nav class="flex justify-between items-center max-w-full px-20 py-5">
      <!-- logo -->
      <a href="/"><Aperture size="35" /></a>
      <!-- navs -->
      <div class="flex gap-10">
        <button
          class="cursor-pointer hover:underline"
          @click="() => scrollTo('home')"
        >
          Home
        </button>
        <button
          class="cursor-pointer hover:underline"
          @click="() => scrollTo('about')"
        >
          About
        </button>
        <button
          class="cursor-pointer hover:underline"
          @click="() => scrollTo('contact')"
        >
          Contact
        </button>
      </div>
      <!-- routes -->
      <a href="/dashboard">Rent Now!</a>
    </nav>
  </header>
</template>
