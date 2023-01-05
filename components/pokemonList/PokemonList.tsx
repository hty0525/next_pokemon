import { pokemonCard } from "../../interface/Ipokemon";

import { useGetPokemonListQuery } from "../../hook/usePokemonQuery";
import { searchedPokemonAtom } from "../../atom/atom";
import { useAtomValue } from "jotai";

import PokemonCard from "./pokemonCard/PokemonCard";
import { useCallback } from "react";

export default function PokemonList({ isSearch }: { isSearch: Boolean }) {
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
  let id = 0;
  return (
    <ul className="grid grid-cols-3 gap-6 max-w-[1200px] m-auto">
      {isSearch
        ? pokemonList?.pages?.map(
            ({ results }, pageIndex: number, { length: pagesLength }) => {
              return results.map(
                (
                  { name, url }: pokemonCard,
                  cardIndex: number,
                  { length: cardLength }: { length: number },
                ) => {
                  const isTarget =
                    pageIndex + 1 === pagesLength &&
                    cardIndex + 1 === cardLength;
                  id++;
                  return (
                    <PokemonCard
                      key={name}
                      name={name}
                      url={url}
                      id={id}
                      isHasNextPage={hasNextPage}
                      isTarget={isTarget}
                      target={target}
                    />
                  );
                },
              );
            },
          )
        : searchPokemon?.map(({ name, url }: pokemonCard, id: number) => {
            return <PokemonCard key={name} name={name} url={url} id={id + 1} />;
          })}
    </ul>
  );
}
