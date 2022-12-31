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
      }
    },
    [hasNextPage, fetchNextPage],
  );

  return (
    <ul className="flex flex-wrap items-center gap-x-[5%] gap-y-5 max-w-[1200px] m-auto">
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
                    <li
                      className="w-[30%] mouse"
                      key={name}
                      ref={isTarget ? target : null}
                    >
                      <PokemonCard name={name} url={url} />
                    </li>
                  );
                },
              ),
          )
        : searchPokemon?.map(({ name, url }: pokemonNameUrlI) => {
            return (
              <li className="w-[30%] mouse" key={name}>
                <PokemonCard name={name} url={url} />
              </li>
            );
          })}
    </ul>
  );
}

export const asdf = 1;
