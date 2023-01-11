import React, { useEffect, useState } from "react";

import { useSetAtom, useAtom } from "jotai";
import { searchedPokemonAtom, pokemonAllListAtom } from "../../../atom/atom";

import { useGetPokemonAllListQuery } from "../../../hook/usePokemonQuery";

import pokemonKoName from "../../../static/pokemonKoName";

import { IPokemonCard } from "../../../interface/pokemon";

export default function SearchPokemon() {
  //   {
  //   isSearchHandler,
  // }: {
  //   isSearchHandler: React.Dispatch<React.SetStateAction<Boolean>>;
  // }
  const [pokemonName, setPokemonName] = useState<string>("");

  const setSearchedPokemon = useSetAtom(searchedPokemonAtom);

  const { data: pokemonAllListData, isSuccess } = useGetPokemonAllListQuery();

  // useEffect(() => {
  //   pokemonName === "" ? isSearchHandler(true) : isSearchHandler(false);
  // }, [pokemonName, isSearchHandler]);

  const searchPokemonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [pokemonAllList, setPokemonAllList] = useAtom(pokemonAllListAtom);

  useEffect(() => {
    if (isSuccess) {
      const pokemonAllListKo = pokemonAllListData?.results.map(
        (value: IPokemonCard) => ({
          ...value,
          name: pokemonKoName[value.name],
        }),
      );
      setPokemonAllList([...pokemonAllListKo]);
    }
  }, [isSuccess, setPokemonAllList, pokemonAllListData]);

  return (
    <form className="m-auto w-full" onSubmit={searchPokemonHandler}>
      <input
        value={pokemonName}
        onChange={({ target: { value } }) => {
          setPokemonName(value.trim());
          const copy = pokemonAllList.filter(({ name }: { name: string }) =>
            name.includes(value.trim()),
          );
          setSearchedPokemon(copy);
        }}
        className="border-b-4 border-gray-500 block w-1/2 py-1 px-2 m-auto"
        type="text"
        placeholder="찾고싶은 포켓몬을 입력해 주세요!"
      />
    </form>
  );
}
