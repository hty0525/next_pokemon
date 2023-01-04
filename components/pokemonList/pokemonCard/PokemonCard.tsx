import { memo } from "react";
import Image from "next/image";

import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPokemonImgIdQuery } from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";
import Link from "next/link";

export default memo(function PokemonCard({
  name,
  url,
  isTarget,
  target,
  isHasNextPage,
}: pokemonNameUrlI) {
  const { data: imgUrl } = useGetPokemonImgIdQuery({ url, key: "imgUrl" });
  const { data: id } = useGetPokemonImgIdQuery({ url, key: "id" });

  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const pokemonName = checkKo.test(name) ? name : pokemonKoName[name];
  const targetCard = (node: HTMLElement | null) => {
    !!node && target && isHasNextPage && target(node);
  };

  return (
    <li ref={isTarget ? targetCard : null}>
      <Link href={`/pokemonDetail/${id}`}>
        <div className="relative h-[20em] border">
          <Image
            src={imgUrl ? imgUrl : "/image/monsterBall.png"}
            className="p-4"
            alt={pokemonName}
            fill
            sizes="auto"
            loading="lazy"
          />
        </div>
        <p>{pokemonName}</p>
      </Link>
    </li>
  );
});
