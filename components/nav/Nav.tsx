import Image from "next/image";
import Link from "next/link";

import SearchPokemon from "./searchPokemon/SearchPokemon";

export default function Nav() {
  return (
    <nav className="flex items-center justify-center w-[1200px] m-auto relative h-full">
      <h1 className="absolute top-0 left-0">
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
