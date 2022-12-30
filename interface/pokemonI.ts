export interface pokemonNameUrlI {
  name: string;
  url: string;
}

export interface getPokemonListI {
  count: string;
  next: string;
  previous: null | string;
  result: pokemonNameUrlI[];
}
