import { useState } from "react";

import PokemonList from "./pokemonList/PokemonList";
import SearchPokemon from "./searchPokemon/SearchPokemon";

export default function Main() {
  const [isSearch, setIsSearch] = useState<Boolean>(true);

  return (
    <>
      <SearchPokemon isSearchHandler={setIsSearch} />
      <PokemonList isSearch={isSearch} />
    </>
  );
}
