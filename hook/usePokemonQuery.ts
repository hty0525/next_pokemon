import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApis } from "../apis/pokemonApis";
import { getPokemonListI, getPokemonInfoI } from "../interface/pokemonI";

export const useGetPokemonListQuery = () =>
  useInfiniteQuery(
    ["pokemonList"],
    async ({ pageParam }) => await pokemonApis.getPokemonList({ pageParam }),
    {
      getNextPageParam: ({ next }): getPokemonListI => {
        return next;
      },
    },
  );

export const useGetPokemonAllListQuery = () =>
  useQuery(["pokemonAllList"], () => pokemonApis.getPokemonAllList());

export const useGetPokemonInfoQuery = ({ url, key }: getPokemonInfoI) =>
  useQuery([url, key], () => pokemonApis.getPokemonInfo({ url, key }));