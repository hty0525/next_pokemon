import { Dispatch, SetStateAction } from "react";

import { useAtomValue } from "jotai";
import { searchedPokemonAtom } from "../../../atom/atom";

import PokemonCard from "../../pokemonList/pokemonCard/PokemonCard";

export default function SearchedList({
  isSearched,
  setIsSearched,
}: {
  isSearched: boolean;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}) {
  const pokemonList = useAtomValue(searchedPokemonAtom);

  return (
    <>
      {isSearched && (
        <div
          className="absolute top-[100%] w-full bg-[rgba(0,0,0,.3)] h-[calc(100vh-6rem)] overflow-hidden py-12 px-5"
          onClick={(e) => {
            const target = e.target as HTMLDivElement;
            if (target.tagName === "DIV") {
              setIsSearched(false);
            }
          }}
        >
          <ul className="max-w-[1200px] m-auto bg-white h-full rounded-xl overflow-y-auto p-4 grid grid-cols-3 gap-5 w-full">
            {pokemonList?.map(({ name, url }, idx) => {
              const id = url.split("/")[url.split("/").length - 2];
              return (
                <li key={idx}>
                  <PokemonCard name={name} id={String(id)} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
