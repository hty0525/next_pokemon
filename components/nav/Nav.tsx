import Image from "next/image";
import Link from "next/link";

import SearchPokemon from "./searchPokemon/SearchPokemon";

export default function Nav() {
  return (
    <nav className="flex sticky top-0  h-24 items-center justify-center w-[1200px] m-auto">
      <h1>
        <Link href="/">
          <Image
            src="/image/main_logo.png"
            alt="logo"
            width={200}
            height={100}
          />
        </Link>
      </h1>
      <SearchPokemon />
    </nav>
  );
}
