<script setup lang="ts">
import { ref } from "vue"
import { useTeamStore } from "@/composables/useTeamStore";

const teamStore = useTeamStore();


import logoPokemon from "@/assets/img/pokemon.png"; 

const toggleMenu = ref(false);

const toggle = () => {
  toggleMenu.value = !toggleMenu.value;
};
</script>
<template>
<nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 fixed z-10 top-0 w-full">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link
      :to="{ name: 'home' }"
      class="flex items-center space-x-3 rtl:space-x-reverse">
      <img :src="logoPokemon" class="h-9" alt="Pokemon Logo" />
    </router-link>
    <button
      type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      @click="toggle"
    >
      <span class="sr-only">Open menu</span>
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div
      class="w-full md:block md:w-auto"
      :class="!toggleMenu && 'hidden'"
    >
      <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li>
          <router-link
            :to="{ name: 'home' }"
            activeClass="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            @click="toggle"
          >Home</router-link>

        </li>
        <li class="flex">
          <router-link
            to="/team"
            activeClass="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            @click="toggle"
          >My Team</router-link>
          <span class="flex items-center justify-center w-4 h-4 text-[10px] text-white bg-blue-700 rounded-full mt-[-5px] ms-[-1px]">
            {{ teamStore.team.length }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
