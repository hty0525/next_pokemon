import React, { useEffect, useState } from "react";

import { useSetAtom, useAtom } from "jotai";
import { searchedPokemonAtom, pokemonAllListAtom } from "../../atom/atom";

import { useGetPokemonAllListQuery } from "../../hook/usePokemonQuery";

export default function SearchPokemon({
  isSearchHandler,
}: {
  isSearchHandler: React.Dispatch<React.SetStateAction<Boolean>>;
}) {
  const [pokemonName, setPokemonName] = useState<string>("");

  const setSearchedPokemon = useSetAtom(searchedPokemonAtom);

  const { data: pokemonAllListData, isSuccess } = useGetPokemonAllListQuery();

  useEffect(() => {
    pokemonName === "" ? isSearchHandler(true) : isSearchHandler(false);
  }, [pokemonName, isSearchHandler]);

  const searchPokemonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [pokemonAllList, setPokemonAllList] = useAtom(pokemonAllListAtom);

  useEffect(() => {
    if (isSuccess) {
      setPokemonAllList(pokemonAllListData?.results);
    }
  }, [isSuccess, setPokemonAllList, pokemonAllListData]);

  return (
    <form className="m-auto sticky" onSubmit={searchPokemonHandler}>
      <input
        value={pokemonName}
        onChange={({ target: { value } }) => {
          setPokemonName(value.trim());
          const copy = pokemonAllList.filter(({ name }: { name: string }) =>
            name.includes(value.trim()),
          );
          setSearchedPokemon(copy);
        }}
        className="border block w-1/2 p-2 m-auto"
        type="text"
      />
    </form>
  );
}
