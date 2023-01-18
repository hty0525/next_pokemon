import { atom } from "jotai";

import { IGetPokemonData } from "../interface/pokemon";

export const pokemonAllListAtom = atom<Array<IGetPokemonData>>([]);

export const searchedPokemonAtom = atom<Array<IGetPokemonData>>([]);
