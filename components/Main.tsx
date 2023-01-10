import { useState } from "react";

import PokemonList from "./pokemonList/PokemonList";
import SearchPokemon from "./nav/searchPokemon/SearchPokemon";

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
