type Type = {
  type: {
    name: string;
    url: string;
  }
}
type Cries = {
  latest: string;
  legacy: string;
}
type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}
type EvolutionChain = {
  url: string;
}
type Species = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    }
  }[];
}
type Sprites = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  other: {
    dream_world: {
      front_default: string;
      front_shiny: string;
    },
    home: {
      front_default: string;
      front_shiny: string;
    },
    "official-artwork": {
      front_default: string;
    },
    showdown: {
      front_default: string;
      front_shiny: string;
    }
  }
}
export interface Pokemon {
  name: string;
  id?: number;
  cries?: Cries;
  url?: string;
  types?: Type[];
  stats?: Stats[];
  sprites?: Sprites;
  species?: Species;
  evolution_chain?: EvolutionChain;
  evolves_from_species?: any;
  chain_evolves_to?: any;
  chain?: any;
  selected?: boolean;
  weight?: number;
  height?: number;
  description?: string
}