import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import SearchPokemon from "../searchPokemon/SearchPokemon";

export default function Nav({
  setIsSearched,
}: {
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="flex items-center justify-center m-auto relative h-full max-w-[1200px]">
      <h1 className="absolute left-0">
        <Link href="/">
          <Image
            src="/image/main_logo.png"
            alt="logo"
            width={200}
            height={200}
            style={{ height: "auto", width: "auto" }}
          />
        </Link>
      </h1>
      <SearchPokemon setIsSearched={setIsSearched} />
    </nav>
  );
}
