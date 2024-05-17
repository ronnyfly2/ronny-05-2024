<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia"
import ToScroll from "@/components/ToScroll.vue";
import { usePokemonStore } from "@/composables/usePokemonStore";
import { useTeamStore } from "@/composables/useTeamStore";
import { useAlertStore } from "@/composables/useAlertStore";

const pokemonStore = usePokemonStore();
const teamStore = useTeamStore();
const alertStore = useAlertStore();

const { pokemon, pokemonList, loading, count } = storeToRefs(pokemonStore)

const disabledButton = ref(false);

const getAllPokemons = async () => {
  await pokemonStore.getPokemons();
}

onMounted(() => {
  infinite();
})
const getPokemon = async (id: number) => {
  disabledButton.value = true;
  await pokemonStore.getPokemon(id)
  await teamStore.addPokemon(pokemon.value)
  const alert = await setAlert();
  alertStore.handleAlert(alert);
  if(count.value === 6) return
  await pokemonStore.addSlectedPokemon(pokemon.value)
  disabledButton.value = false;
}

const setAlert = async () =>{
  const alert ={
    message: teamStore.error?teamStore.error:`Pokemon <strong>${pokemon.value.name}</strong> added to your team`,
    isActive: true,
    typeAlert: teamStore.error?'error':'success',
    timeout: 12000
  }
  return alert;
}

const infinite = async () => {
  if(pokemonList.value.length >= 151){
    return;
  }
  getAllPokemons();
}
</script>

<template>
  <main>
    <to-scroll @infinite="infinite" :show-more="loading" class="mx-auto max-w-screen-xl px-4">
      <div class="flex flex-wrap justify-center xl:justify-start md:justify-start lg:justify-start gap-x-[1%] gap-y-[20px]">
        <div
          v-for="(item, idx) in pokemonList"
          :key="idx"
          class="w-full lg:basis-[24.23%] md:basis-[32.62%] max-w-sm  rounded-lg transition duration-300 ease-in-out"
          :class="item.selected? 'background-color:blue-100 bg-gray-700 border-gray-600': 'shadow dark:bg-gray-800 dark:border-gray-700 hover:background-color:blue-100 dark:hover:bg-gray-700 dark:hover:border-gray-600 bg-white border border-gray-200'"
        >
          <div class="flex flex-col items-center py-10">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="`https://img.pokemondb.net/sprites/home/normal/${item.name}.png`" :alt="item.name" />
            <h5
              class="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize"
              :class="item.selected?'text-white':'text-gray-900 dark:text-white'"
            >{{ item.name }}</h5>
            <div class="flex mt-4 md:mt-4">
              <button
                type="button"
                @click="getPokemon(idx+1)"
                :disabled="disabledButton"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg"
                :class="item.selected? 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed':'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'"
              >{{ item.selected?'Selected':'Add' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </to-scroll>
  </main>
</template>
