<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia"
import { useTeamStore } from "@/composables/useTeamStore";
import { useRoute, useRouter } from "vue-router";

import AudioSource from "@/components/AudioSource.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import PokeType from "@/components/PokeType.vue";
import PokeEvolutions from "@/components/PokeEvolutions.vue";

const route = useRoute();
const router = useRouter();

const teamStore = useTeamStore();

const { pokemonTeam } = storeToRefs(teamStore)

onMounted(async () => {
  if(route.params.id){
    let id = Number(route.params.id)
    const isTeam = await teamStore.getPokemonTeam(id)
    if(!isTeam){
      router.push({ path: '/team' })
    }
  }
})
const goBack = () => {
  router.go(-1)
}
</script>
<template>
  <div v-if="pokemonTeam" class="mx-auto max-w-screen-xl px-4">
    <button @click="goBack" type="button" class="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-white mb-5">
      <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
      </svg>
      back
    </button>
    <div
      class="w-full rounded-lg transition duration-300 ease-in-out relative px-5"
      :class="pokemonTeam.selected? 'background-color:blue-100 bg-gray-700 border-gray-600': 'shadow dark:bg-gray-800 dark:border-gray-700 hover:background-color:blue-100 bg-white border border-gray-200'"
    >
      <div class="flex flex-col items-center py-10">
        <div class="absolute left-2 top-2">
          <AudioSource :audioSrc="pokemonTeam.cries?.latest" />
        </div>
        <img class=" w-80 h-80 mb-3" :src="`https://img.pokemondb.net/sprites/home/normal/${pokemonTeam.name}.png`" :alt="pokemonTeam.name" />
        <h5
          class="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize"
          :class="pokemonTeam.selected?'text-white':'text-gray-900 dark:text-white'"
        >{{ pokemonTeam.name }}</h5>
        <PokeType :types="pokemonTeam.types || []" />
        <div v-if="pokemonTeam.weight && pokemonTeam.height">
          <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ pokemonTeam.weight / 10 }}Kg</span>
          <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ pokemonTeam.height / 10 }}Mts</span>
        </div>
        <div class="w-full pt-6">
          <p class="text-center mb-4 font-normal text-gray-700 dark:text-gray-400">{{ pokemonTeam.description }}</p>
          <div class="flex gap-6">
            <div class="flex flex-col w-full">
              <strong class="block my-2">Base Stats:</strong>
              <div class="py-2" v-for="(stat, idx) in pokemonTeam.stats" :key="idx">
                <ProgressBar :stat="stat" />
              </div>
            </div>
            <PokeEvolutions :pokemonTeam="pokemonTeam" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>