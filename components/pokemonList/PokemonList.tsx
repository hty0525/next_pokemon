import { IGetPokemonData } from "../../interface/pokemon";

import { useGetPokemonListQuery } from "../../hook/usePokemonQuery";
import { searchedPokemonAtom } from "../../atom/atom";
import { useAtomValue } from "jotai";

import PokemonCard from "./pokemonCard/PokemonCard";
import { useCallback } from "react";

export default function PokemonList() {
  // { isSearch }: { isSearch: Boolean }
  const {
    data: pokemonList,
    fetchNextPage,
    hasNextPage,
  } = useGetPokemonListQuery();

  const searchPokemon = useAtomValue(searchedPokemonAtom);

  const target = useCallback(
    (node: HTMLElement) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const { isIntersecting, target } = entry;
          if (isIntersecting) {
            fetchNextPage();
            observer.unobserve(target);
          }
        },
        {
          root: null,
          threshold: 0,
        },
      );
      observer.observe(node);
    },
    [fetchNextPage],
  );
  const isSearch = true;
  return (
    <ul className="grid grid-cols-3 gap-6 w-full m-auto">
      {isSearch
        ? pokemonList?.pages?.map(
            ({ results }, pageIndex: number, { length: pagesLength }) => {
              return results.map(
                (
                  { name, url }: IGetPokemonData,
                  cardIndex: number,
                  { length: cardLength }: { length: number },
                ) => {
                  const isTarget =
                    pageIndex + 1 === pagesLength &&
                    cardIndex + 1 === cardLength;

                  const id = url.split("/")[url.split("/").length - 2];

                  return (
                    <PokemonCard
                      key={name}
                      name={name}
                      id={String(id)}
                      isHasNextPage={hasNextPage}
                      isTarget={isTarget}
                      target={target}
                    />
                  );
                },
              );
            },
          )
        : searchPokemon?.map(({ name, url }: IGetPokemonData) => {
            const id = url.split("/")[url.split("/").length - 2];

            return <PokemonCard key={name} name={name} id={String(id)} />;
          })}
    </ul>
  );
}
