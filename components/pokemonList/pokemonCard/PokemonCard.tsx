import { memo } from "react";
import Image from "next/image";

import { IPokemonCard } from "../../../interface/pokemon";

import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import pokemonKoName from "../../../static/pokemonKoName";
import pokemonTypeColor from "../../../static/pokemonTypeColor";

import Link from "next/link";

export default memo(function PokemonCard({
  name,
  isTarget,
  target,
  isHasNextPage,
  id,
}: IPokemonCard) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ id, key: "imgUrl" });
  const { data: type, isLoading: typeIsLoading } = useGetPokemonInfoQuery({
    id,
    key: "type",
  });
  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const pokemonName = checkKo.test(name) ? name : pokemonKoName[name];

  const targetCard = (node: HTMLElement | null) => {
    !!node && target && isHasNextPage && target(node);
  };

  return (
    <li ref={isTarget ? targetCard : null}>
      <Link
        href={{
          pathname: `/pokemonDetail/${id}`,
        }}
      >
        <div className="relative w-full pb-[100%] border">
          <Image
            className="p-4"
            src={imgUrl ? imgUrl : "/image/monsterBall.png"}
            alt={pokemonName}
            fill
            priority
            sizes="auto"
          />
        </div>

        <p className={`${pokemonTypeColor[type?.[0] ?? "flying"]} text-white`}>
          {id}
          {pokemonName}
        </p>
      </Link>
    </li>
  );
});
