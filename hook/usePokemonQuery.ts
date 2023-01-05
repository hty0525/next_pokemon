import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApis } from "../apis/pokemonApis";
import { IGetPokemonList, IGetPokemonInfo } from "../interface/pokemon";

export const useGetPokemonListQuery = () =>
  useInfiniteQuery(
    ["pokemonList"],
    ({ pageParam = 0 }) => pokemonApis.getPokemonList({ pageParam }),
    {
      getNextPageParam: ({ next }: IGetPokemonList) => {
        const offset = next.split("?")[1].split("&")[0];
        let nextOffSet = Number(offset.substring(offset.indexOf("=") + 1));
        if (nextOffSet >= 251) {
          return undefined;
        }
        return nextOffSet;
      },
    },
  );

export const useGetPokemonAllListQuery = () =>
  useQuery(["pokemonAllList"], () => pokemonApis.getPokemonAllList());

export const useGetPokemonInfoQuery = ({ url, key }: IGetPokemonInfo) =>
  useQuery(
    ["useGetPokemonInfoQuery", url, key],
    () => pokemonApis.getPokemonInfo({ url }),
    {
      select: (data) => {
        switch (key) {
          case "imgUrl":
            return data?.sprites?.other?.["official-artwork"].front_default;
          case "type":
            return data;
          default:
            data?.types;
            return data;
        }
      },
    },
  );

export const useGetPokemonDescQuery = (id: string | string[]) => {
  return useQuery(["useGetPokemonDescQuery", id], () => {
    return pokemonApis.getPokemonDesc(id);
  });
};
