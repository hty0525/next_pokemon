import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useMediaQuery from "../../../hook/useMediaQuery";

import SearchPokemon from "../searchPokemon/SearchPokemon";

export default function Nav({
  setIsSearched,
}: {
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}) {
  const [isToggle, setIsToggle] = useState(true);

  const isHidden = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isHidden) {
      setIsToggle(false);
    }
  }, [isHidden]);

  return (
    <nav className="flex items-center justify-center m-auto relative h-full max-w-[1200px] overflow-hidden">
      <h1 className="md:absolute left-0 static md:z-50">
        <Link href="/">
          <Image
            src="/image/main_logo.png"
            alt="logo"
            width={200}
            height={200}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        </Link>
      </h1>
      <SearchPokemon setIsSearched={setIsSearched} isToggle={isToggle} />
      {!isHidden && (
        <button
          className="absolute top-[50%] translate-y-[-50%] right-4 w-10 h-10 z-50"
          onClick={() => {
            setIsToggle(!isToggle);
          }}
        >
          <Image
            src="/image/smallMonsterBall.png"
            alt="searchIcon"
            priority={false}
            width={40}
            height={40}
          />
        </button>
      )}
    </nav>
  );
}
