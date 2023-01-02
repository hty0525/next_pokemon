import { memo } from "react";
import Image from "next/image";

import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";

export default memo(function PokemonCard({
  name,
  url,
  isTarget,
  target,
}: pokemonNameUrlI) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ url, key: "imgUrl" });
  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const pokemonName = checkKo.test(name) ? name : pokemonKoName[name];

  const targetCard = (node: HTMLElement | null) => {
    target && target(node);
  };

  return (
    <li ref={isTarget ? targetCard : null}>
      <div className="relative h-[20em] border">
        <Image
          src={imgUrl ? imgUrl : "/image/monsterBall.png"}
          className="p-4"
          alt={pokemonName}
          fill
          priority
          sizes="auto"
        />
      </div>
      <p>{pokemonName}</p>
    </li>
  );
});
