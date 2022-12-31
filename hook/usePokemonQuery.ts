import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApis } from "../apis/pokemonApis";
import { getPokemonListI } from "../interface/pokemonI";

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

export const useGetPoketImgUrl = (url: string) =>
  useQuery([url], () => pokemonApis.getPokemonImg(url));
