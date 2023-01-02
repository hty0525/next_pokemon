import { useCallback } from "react";

import { pokemonNameUrlI } from "../../interface/pokemonI";

import { useGetPokemonListQuery } from "../../hook/usePokemonQuery";
import { searchedPokemonAtom } from "../../atom/atom";
import { useAtomValue } from "jotai";

import PokemonCard from "./pokemonCard/PokemonCard";

export default function PokemonList({ isSearch }: { isSearch: Boolean }) {
  const {
    data: pokemonList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPokemonListQuery();

  const searchPokemon = useAtomValue(searchedPokemonAtom);

  const target = useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        return;
      } else {
        const observer = new IntersectionObserver(
          ([entry]) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting && hasNextPage && !isFetchingNextPage) {
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
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage],
  );

  return (
    <ul className="grid grid-cols-3 gap-6 max-w-[1200px] m-auto">
      {isSearch
        ? pokemonList?.pages?.map(
            ({ results }, pageIndex: number, { length: pagesLength }) =>
              results.map(
                (
                  { name, url }: pokemonNameUrlI,
                  cardIndex: number,
                  { length: cardLength }: { length: number },
                ) => {
                  const isTarget =
                    pageIndex + 1 === pagesLength &&
                    cardIndex + 1 === cardLength;
                  return (
                    <PokemonCard
                      key={name}
                      name={name}
                      url={url}
                      isTarget={isTarget}
                      target={target}
                    />
                  );
                },
              ),
          )
        : searchPokemon?.map(({ name, url }: pokemonNameUrlI) => {
            return <PokemonCard key={name} name={name} url={url} />;
          })}
    </ul>
  );
}
