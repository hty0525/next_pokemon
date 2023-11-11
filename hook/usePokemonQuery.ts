import { useQuery, useInfiniteQuery, useQueries } from "@tanstack/react-query";
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
  useQuery([`pokemon${key}`, id], () => pokemonApis.getPokemonInfo(id), {
    onSuccess(data) {
      console.log(1234);
    },
    onError: () => {
      console.error("에러났어");
      alert("에러났어요");
      return "error";
    },

    select: (data) => {
      switch (key) {
        case "ImgUrl":
          return data?.sprites?.other?.["official-artwork"].front_default;

        case "Type":
          return data?.types.map(
            ({ type: { name } }: { type: { name: string } }) => name,
          );

        default:
          return data;
      }
    },
  });

export const useGetPokemonDescQuery = ({
  id,
  key,
}: {
  id: string | string[];
  key?: string;
}) => {
  return useQuery(
    [`pokemon${key}`, id],
    () => {
      return pokemonApis.getPokemonDesc(id);
    },
    {
      select: (data) => {
        switch (key) {
          case "Name":
            return data?.name;

          case "Class":
            const pokemonClass = data?.genera.filter(
              ({ language: { name } }: { language: { name: string } }) =>
                name === "ko",
            )[0].genus;
            return pokemonClass;

          case "Desc":
            const pokemonDesc = data?.flavor_text_entries.filter(
              ({
                language: { name: language },
              }: {
                language: { name: string };
              }) => language === "ko",
            );
            return pokemonDesc[0]?.flavor_text;

          default:
            return data;
        }
      },
    },
  );
};
