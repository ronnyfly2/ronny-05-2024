<script setup lang="ts">
  import { storeToRefs } from "pinia"

  import { usePokemonStore } from "@/composables/usePokemonStore";
  import { useTeamStore } from "@/composables/useTeamStore";

  import { type Pokemon } from "@/interfaces/pokemon"

  import AudioSource from "@/components/AudioSource.vue";
  import ProgressBar from "@/components/ProgressBar.vue";

  const teamStore = useTeamStore();
  const pokemonStore = usePokemonStore();
  const { team } = storeToRefs(teamStore)

  const removePokemon = async (pokemon:Pokemon) => {
    await teamStore.removePokemon(pokemon)
    await pokemonStore.removeSlectedPokemon(pokemon)
  }
  const getFlavorText = (pokemon:Pokemon) => {
    const findFlavorText = pokemon.species?.flavor_text_entries.find(text=>text.language.name==='en')
    return findFlavorText && findFlavorText.flavor_text ? findFlavorText.flavor_text : pokemon.species?.flavor_text_entries[0].flavor_text
  }
  
</script>
<template>
  <div class="mx-auto max-w-screen-xl px-4">
    <div v-if="(team.length===0)">
      <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white">No Pokemon in your team</h1>
    </div>
    <div v-else class="flex flex-wrap justify-center xl:justify-start md:justify-start lg:justify-start gap-x-[1%] gap-y-[20px]">
      <div
        v-for="(pokemon, idx) in team" :key="idx"
        class="relative flex flex-col items-center basis-[100%] md:basis-[49.44%] bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[100%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          v-if="pokemon.sprites"
          :src="pokemon.sprites.other.showdown.front_default"
          :alt="pokemon.name"
          class="object-contain pt-8 w-full rounded-t-lg h-32 md:pt-0 md:h-auto md:w-44 md:px-3 md:rounded-none md:rounded-s-lg"
        />
        <div class="flex flex-col justify-between p-4 leading-normal h-full">
          <div class="absolute left-2 top-2">
            <AudioSource :audioSrc="pokemon.cries?.latest" />
          </div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{{ pokemon.name }}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ getFlavorText(pokemon) }}</p>
          <div class="flex gap-2 mb-4">
            <span
              class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              v-for="(itm, indx) in pokemon.types"
              :key="indx"
            >{{ itm.type.name }}</span>
          </div>
          <div class="w-full" v-for="(stat, idx) in pokemon.stats" :key="idx">
            <ProgressBar :stat="stat" />
          </div>
          <div class="flex mt-4 md:mt-4 gap-3">
            <router-link
              :to="{ path: 'team/'+pokemon.id }"
              class="font-medium inline-flex items-center px-4 py-2 text-sm text-center rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >View more</router-link>
            <button
              type="button"
              @click="removePokemon(pokemon)"
              class="font-medium inline-flex items-center px-4 py-2 text-sm text-center rounded-lg focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>