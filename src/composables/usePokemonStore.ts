import { defineStore } from "pinia"
import { getItemByIdServiceForGet, getItemsForPageServiceForGet } from "@/apiServices"
import { type Pokemon } from "@/interfaces/pokemon"

interface State {
  pokemon:     Pokemon;
  pokemonList: Pokemon[];
  loading:     boolean;
  error:       string;
  offset:      number,
  limit:       number,
  quantity:    number,
  count:       number
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): State => ({
    pokemon:     {name: "", url: ""},
    pokemonList: [],
    offset:      0,
    limit:       25,
    quantity:    25,
    loading:     false,
    error:       "",
    count:       0
  }),
  actions: {
    async getPokemons() {
      this.loading = true
      this.error = ""
      const pokemonList = await getItemsForPageServiceForGet(`pokemon`, this.offset, this.offset===125?this.limit+1:this.limit)
      if (pokemonList.status ===400)
        this.loading = false
        this.error = 'Error'
      if (pokemonList.status ===201)
        pokemonList.data.results = pokemonList.data.results.map((pokemon: Pokemon) => {
          return {
            ...pokemon,
            selected: false
          }
        })
        this.loading = false
        this.error = ""
        this.pokemonList = [...this.pokemonList, ...pokemonList.data.results]
        this.offset = this.offset + this.quantity;
    },
    async getPokemon(id: number) {
      const pokemon = await getItemByIdServiceForGet(`pokemon`, id)
      this.loading = true
      this.error = ""
      if (pokemon.status ===400)
        this.loading = false
        this.error = 'Error'
      if (pokemon.status ===200)
        this.loading = false
        this.error = ""
        this.pokemon = pokemon.data
        this.getSpecies(id)
    },
    async getSpecies(id: number) {
      const species = await getItemByIdServiceForGet(`pokemon-species`, id)
      this.loading = true
      this.error = ""
      if (species.status ===400)
        this.loading = false
        this.error = 'Error'
      if (species.status ===200)
        this.loading = false
        this.error = ""
        this.pokemon.species = species.data
        this.pokemon.evolution_chain = species.data.evolution_chain
        this.pokemon.evolves_from_species = species.data.evolves_from_species
        const idFrom = species.data.evolution_chain.url.split('/')[6]
        if(idFrom){
          this.getEvolutionChain(idFrom)
        }
        this.pokemon.description = await this.getDescription(this.pokemon)
    },
    async getEvolutionChain(id: number) {
      const evolutionChain = await getItemByIdServiceForGet(`evolution-chain`, id)
      this.loading = true
      this.error = ""
      if (evolutionChain.status ===400)
        this.loading = false
        this.error = 'Error'
      if (evolutionChain.status ===200)
        this.loading = false
        this.error = ""
        this.pokemon.chain_evolves_to = evolutionChain.data.chain.evolves_to
        this.pokemon.chain = evolutionChain.data.chain
    },
    async getPokemonPage(id: number) {
      const index = this.pokemonList.findIndex(p => p.id === id)
      this.pokemon = this.pokemonList[index]
      return true
    },
    async addSlectedPokemon(pokemon: Pokemon) {
      const index = this.pokemonList.findIndex(p => p.name === pokemon.name)
      this.pokemonList[index].selected = true
      this.count++
    },
    async removeSlectedPokemon(pokemon: Pokemon) {
      const index = this.pokemonList.findIndex(p => p.name === pokemon.name)
      this.pokemonList[index].selected = false
      this.count--
    },
    async getDescription(pokemon: Pokemon) {
      const description = pokemon.species?.flavor_text_entries.find((description: any) => description.language.name === 'en')
      return description && description.flavor_text ? description.flavor_text : pokemon.species?.flavor_text_entries[0].flavor_text
    }
  },
});