import { ReactHTMLElement, useCallback, useRef } from "react";
import { useGetPokemonListQuery } from "../../hook/usePokemonQuery";
import { pokemonNameUrlI } from "../../interface/pokemonI";
import PoketmonCard from "./poketmonCard/PoketmonCard";
export default function PokemonList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPokemonListQuery();

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
    <ul className="flex flex-wrap items-center gap-x-[5%] gap-y-5">
      {data?.pages?.map(
        ({ results }, pageIndex: number, { length: pagesLength }) =>
          results.map(
            (
              { name, url }: pokemonNameUrlI,
              cardIndex: number,
              { length: cardLength }: { length: number },
            ) => {
              const isTarget =
                pageIndex + 1 === pagesLength && cardIndex + 1 === cardLength;
              return (
                <li
                  className="w-[30%]"
                  key={name}
                  ref={isTarget ? target : null}
                >
                  <PoketmonCard name={name} url={url} />
                </li>
              );
            },
          ),
      )}
    </ul>
  );
}

export const asdf = 1;
