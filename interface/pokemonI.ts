export interface pokemonNameUrlI {
  name: string;
  url: string;
  isTarget?: Boolean;
  target?(node: HTMLElement | null): void | undefined;
  isHasNextPage?: Boolean;
}

export interface getPokemonListI {
  count: string;
  next: string;
  previous: null | string;
  result: pokemonNameUrlI[];
}

export interface getPokemonInfoI {
  url: string;
  key: string;
}
