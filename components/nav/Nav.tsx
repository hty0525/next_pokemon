import Link from "next/link";

import SearchPokemon from "./searchPokemon/SearchPokemon";

export default function Nav() {
  return (
    <nav className="flex sticky top-0 bg-white">
      <h1>
        <Link href="/">Logo</Link>
      </h1>
      <SearchPokemon />
    </nav>
  );
}
