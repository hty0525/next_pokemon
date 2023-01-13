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
        if (nextOffSet >= 898) {
          return undefined;
        }
        return nextOffSet;
      },
    },
  );

export const useGetPokemonAllListQuery = () =>
  useQuery(["pokemonAllList"], () => pokemonApis.getPokemonAllList());

export const useGetPokemonInfoQuery = ({ id, key }: IGetPokemonInfo) =>
  useQuery(
    ["useGetPokemonInfoQuery", id, key],
    () => pokemonApis.getPokemonInfo({ id }),
    {
      select: (data) => {
        switch (key) {
          case "imgUrl":
            return data?.sprites?.other?.["official-artwork"].front_default;

          case "type":
            return data?.types.map(
              ({ type: { name } }: { type: { name: string } }) => name,
            );

          default:
            return data;
        }
      },
    },
  );

export const useGetPokemonDescQuery = ({
  id,
  key,
}: {
  id: string | string[];
  key?: string;
}) => {
  return useQuery(
    ["useGetPokemonDescQuery", id, key],
    () => {
      return pokemonApis.getPokemonDesc(id);
    },
    {
      select: (data) => {
        switch (key) {
          case "name":
            return data?.name;

          case "class":
            const pokemonClass = data?.genera.filter(
              ({ language: { name } }: { language: { name: string } }) =>
                name === "ko",
            )[0].genus;
            return pokemonClass;

          case "desc":
            const pokemonDesc = data?.flavor_text_entries.filter(
              ({
                language: { name: language },
                version: { name: version },
              }: {
                language: { name: string };
                version: { name: string };
              }) => language === "ko" && version === "shield",
            );
            return pokemonDesc[0]?.flavor_text;

          default:
            return data;
        }
      },
    },
  );
};
