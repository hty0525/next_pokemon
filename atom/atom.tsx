import { atom } from "jotai";

import { IGetPokemonData } from "../interface/pokemon";

export const pokemonAllListAtom = atom<Array<IGetPokemonData>>([]);

export const searchedPokemonAtom = atom<Array<IGetPokemonData>>([]);

export const todayPokemonAtomNum = atom<Array<number>>([]);

export const slideCurIndex = atom(0);
