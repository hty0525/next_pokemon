import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApis } from "../apis/pokemonApis";
import { getPokemonListI, getPokemonInfoI } from "../interface/pokemonI";

export const useGetPokemonListQuery = () =>
  useInfiniteQuery(
    ["pokemonList"],
    ({ pageParam = 0 }) => pokemonApis.getPokemonList({ pageParam }),
    {
      getNextPageParam: ({ next }: getPokemonListI) => {
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

export const useGetPokemonImgIdQuery = ({ url, key }: getPokemonInfoI) =>
  useQuery([url, key], () => pokemonApis.getPokemonImgId({ url }), {
    select: (data) => {
      switch (key) {
        case "imgUrl":
          return data?.sprites?.other?.["official-artwork"].front_default;
        case "id":
          return data?.id;
        default:
          return data;
      }
    },
  });
