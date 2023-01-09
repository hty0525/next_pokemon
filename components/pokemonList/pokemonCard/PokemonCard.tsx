import { memo } from "react";
import Image from "next/image";

import { IPokemonCard } from "../../../interface/pokemon";

import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";
import { pokemonTypeColor } from "../../../static/\bpokemonTypeColor";

import Link from "next/link";

export default memo(function PokemonCard({
  name,
  isTarget,
  target,
  isHasNextPage,
  id,
}: IPokemonCard) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ id, key: "imgUrl" });
  const { data: type } = useGetPokemonInfoQuery({ id, key: "type" });
  const typeColor = type && pokemonTypeColor[type[0]];
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
            src={imgUrl ? imgUrl : "/image/monsterBall.png"}
            className="p-4"
            alt={pokemonName}
            fill
            sizes="auto"
            loading="lazy"
          />
        </div>

        <p style={{ background: typeColor, color: "white" }}>
          {id}
          {pokemonName}
        </p>
      </Link>
    </li>
  );
});
