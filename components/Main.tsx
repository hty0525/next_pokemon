import { useState } from "react";

import PokemonList from "./pokemonList/PokemonList";

export default function Main() {
  const [isSearch, setIsSearch] = useState<Boolean>(true);

  return (
    <>
      <PokemonList
      // sSearch={isSearch}
      />
    </>
  );
}
