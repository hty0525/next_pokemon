import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Nav from "./nav/Nav";
import SearchedList from "./searchedPokemon/SearchedList";

export default function Header() {
  const [isSearched, setIsSearched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsSearched(false);
  }, [router]);

  return (
    <header className="bg-white sticky top-0 z-50  h-24">
      <Nav setIsSearched={setIsSearched} />
      <SearchedList isSearched={isSearched} setIsSearched={setIsSearched} />
    </header>
  );
}
