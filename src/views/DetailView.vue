<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia"
import { useTeamStore } from "@/composables/useTeamStore";
import { useRoute, useRouter } from "vue-router";

import AudioSource from "@/components/AudioSource.vue";
import ProgressBar from "@/components/ProgressBar.vue";

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
      :class="pokemonTeam.selected? 'background-color:blue-100 bg-gray-700 border-gray-600': 'shadow dark:bg-gray-800 dark:border-gray-700 hover:background-color:blue-100 dark:hover:bg-gray-700 dark:hover:border-gray-600 bg-white border border-gray-200'"
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
        <div class="flex gap-2 mb-4">
          <span
            class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            v-for="(itm, indx) in pokemonTeam.types"
            :key="indx"
          >{{ itm.type.name }}</span>
        </div>
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
            <div class="flex flex-col w-full">
              <div v-if="pokemonTeam.chain&&pokemonTeam.chain.species">
                <div v-if="pokemonTeam.name != pokemonTeam.chain?.species?.name" class="flex flex-col gap-2 mb-4">
                  <strong class="block my-2">From:</strong>
                  <img class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${pokemonTeam.chain.species.name}.png`" :alt="pokemonTeam.chain.species.name" />
                  <span>{{ pokemonTeam.chain.species.name }}</span>
                </div>
                <div v-if="pokemonTeam.evolves_from_species && pokemonTeam.chain.species.name != pokemonTeam.evolves_from_species.name" class="flex flex-col gap-2 mb-4">
                  <strong class="block">From:</strong>
                  <img class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${pokemonTeam.evolves_from_species.name}.png`" :alt="pokemonTeam.evolves_from_species.name" />
                  <span>{{ pokemonTeam.evolves_from_species.name }}</span>
                </div>
              </div>
              <strong class="block my-2">Evolutions:</strong>
              <div class="flex flex-wrap gap-4">
                <div v-for="(evol, idx) in pokemonTeam.chain_evolves_to" :key="idx">
                  <img v-if="evol.species.name!=pokemonTeam.name && evol.species.name!=pokemonTeam.evolves_from_species?.name" class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${evol.species.name}.png`" :alt="evol.species.name" />
                  <span v-if="evol.species.name!=pokemonTeam.name && evol.species.name!=pokemonTeam.evolves_from_species?.name">{{ evol.species.name }}</span>
                  <div v-if="evol.evolves_to">
                    <div v-for="(prev, ind) in evol.evolves_to" :key="ind">
                      <img v-if="prev.species.name != pokemonTeam.name" class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${prev.species.name}.png`" :alt="prev.species.name" />
                      <span v-if="prev.species.name != pokemonTeam.name">{{ prev.species.name }}</span>
                      <span v-else>---</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>