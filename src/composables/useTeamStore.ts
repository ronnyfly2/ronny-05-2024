import { defineStore } from "pinia"
import { type Pokemon } from "@/interfaces/pokemon"

interface State {
  pokemonTeam: Pokemon;
  team:        Pokemon[];
  limitTeam:   number;
  loading:     boolean;
  error:       string;
}

export const useTeamStore = defineStore("team", {
  state: (): State => ({
    pokemonTeam: {name: "", url: ""},
    team:        [],
    limitTeam:   6,
    loading:     false,
    error:       "",
  }),
  actions: {
    async addPokemon(pokemon: Pokemon) {
      this.loading = true
      this.error = ""
      if (this.team.length >= this.limitTeam) {
        this.loading = false
        this.error = "You can't have more than 6 pokemons in your team"
        return
      }
      const repeated = this.team.find(p => p.name === pokemon.name)
      if (repeated) {
        this.loading = false
        this.error = "You can't have the same pokemon twice in your team"
        return
      }
      this.team = [...this.team, pokemon]
      this.loading = false
    },
    async removePokemon(pokemon: Pokemon) {
      this.loading = true
      this.error = ""
      this.team = this.team.filter(p => p.name !== pokemon.name)
      this.loading = false
    },
    async getPokemonTeam(id: number) {
      const index = this.team.findIndex(p => p.id === id)
      this.pokemonTeam = this.team[index]
      return this.pokemonTeam
    }
  },
});