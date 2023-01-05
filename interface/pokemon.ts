export interface IPokemonCard {
  name: string;
  url: string;
  id: number;
  isTarget?: Boolean;
  target?(node: HTMLElement | null): void | undefined;
  isHasNextPage?: Boolean;
}

export interface IGetPokemonList {
  count: string;
  next: string;
  previous: null | string;
  results: IPokemonCard[];
}

export interface IGetPokemonInfo {
  url: string;
  key: string;
}
