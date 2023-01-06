export interface IPokemonCard {
  name: string;
  id: string;
  isTarget?: Boolean;
  target?(node: HTMLElement | null): void | undefined;
  isHasNextPage?: Boolean;
}

export interface IGetPokemonList {
  count: string;
  next: string;
  previous: null | string;
  results: IGetPokemonData[];
}

export interface IGetPokemonInfo {
  id: string | string[] | undefined;
  key: string;
}

export interface IGetPokemonData {
  name: string;
  url: string;
}
