import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import { useSetAtom, useAtom } from "jotai";
import { searchedPokemonAtom, pokemonAllListAtom } from "../../../atom/atom";

import { useGetPokemonAllListQuery } from "../../../hook/usePokemonQuery";

import pokemonKoName from "../../../static/pokemonKoName";

import { IPokemonCard } from "../../../interface/pokemon";

export default function SearchPokemon({
  setIsSearched,
}: {
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}) {
  const [pokemonName, setPokemonName] = useState<string>("");

  const setSearchedPokemon = useSetAtom(searchedPokemonAtom);

  const [pokemonAllList, setPokemonAllList] = useAtom(pokemonAllListAtom);

  const { data: pokemonAllListData, isSuccess } = useGetPokemonAllListQuery();

  const searchPokemonHandler = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPokemonName(value.trim());
    if (value.trim() === "") {
      setSearchedPokemon([]);
      return;
    }
    const copy = pokemonAllList.filter(({ name }: { name: string }) =>
      name.includes(value.trim()),
    );
    setSearchedPokemon(copy);
  };

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
  }, [isSuccess, pokemonAllListData?.results, setPokemonAllList]);

  return (
    <form className="m-auto w-full">
      <input
        value={pokemonName}
        onChange={searchPokemonHandler}
        onFocus={() => {
          setIsSearched(true);
        }}
        className="border-b-4 border-gray-500 block w-1/2 py-1 px-2 m-auto text-xl"
        type="text"
        placeholder="찾고싶은 포켓몬을 입력해 주세요!"
      />
    </form>
  );
}
