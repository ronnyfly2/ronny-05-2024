<script setup lang="ts">
import { type Pokemon } from '@/interfaces/pokemon';

const props = defineProps<{
  pokemonTeam: Pokemon;
}>();
</script>
<template>
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
    <strong class="block my-2">{{ 'Evolutions' }}:</strong>
    <div v-if="props.pokemonTeam?.chain_evolves_to?.length > 0" class="flex flex-wrap gap-4">
      <div v-for="(evol, idx) in props.pokemonTeam.chain_evolves_to" :key="idx">
        <div v-if="evol.species.name!=props.pokemonTeam.name && evol.species.name!=props.pokemonTeam.evolves_from_species?.name">
          <img class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${evol.species.name}.png`" :alt="evol.species.name" />
          <span>{{ evol.species.name }}</span>
        </div>
        <div v-if="evol.evolves_to">
          <div v-for="(prev, ind) in evol.evolves_to" :key="ind">
            <div v-if="prev.species.name != props.pokemonTeam.name">
              <img class=" w-20 h-20" :src="`https://img.pokemondb.net/sprites/home/normal/${prev.species.name}.png`" :alt="prev.species.name" />
              <span>{{ prev.species.name }}</span>
            </div>
            <span v-else>---</span>
          </div>
        </div>
        <span v-else>---</span>
      </div>
    </div>
  </div>
</template>