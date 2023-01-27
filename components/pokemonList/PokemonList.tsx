import { useCallback } from "react";

import { IGetPokemonData } from "../../interface/pokemon";

import { useGetPokemonListQuery } from "../../hook/usePokemonQuery";

import PokemonCard from "./pokemonCard/PokemonCard";

export default function PokemonList() {
  const {
    data: pokemonList,
    fetchNextPage,
    hasNextPage,
  } = useGetPokemonListQuery();

  const target = useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          const { isIntersecting, target } = entry;
          if (isIntersecting && hasNextPage) {
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
    [fetchNextPage, hasNextPage],
  );

  return (
    <ul className="grid  gap-5 w-full m-auto py-10 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
      {pokemonList?.pages?.map(
        ({ results }, pageIndex: number, { length: pagesLength }) => {
          return results.map(
            (
              { name, url }: IGetPokemonData,
              cardIndex: number,
              { length: cardLength }: { length: number },
            ) => {
              const isTarget =
                pageIndex + 1 === pagesLength && cardIndex + 1 === cardLength;

              const id = url.split("/")[url.split("/").length - 2];

              return (
                <li key={name} ref={isTarget ? target : null}>
                  <PokemonCard name={name} id={String(id)} />
                </li>
              );
            },
          );
        },
      )}
    </ul>
  );
}
