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

  return (
    <ul className="grid grid-cols-4 gap-10 w-full m-auto pt-10">
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
      )}
    </ul>
  );
}
