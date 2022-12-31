import Image from "next/image";

import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";

export default function PokemonCard({ name, url }: pokemonNameUrlI) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ url, key: "imgUrl" });
  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const pokemonName = checkKo.test(name) ? name : pokemonKoName[name];

  return (
    <>
      <div className="relative h-[20em] border">
        <Image
          src={imgUrl ? imgUrl : "/image/monsterBall.png"}
          alt={pokemonName}
          fill
          className="p-4"
        />
      </div>
      <p>{pokemonName}</p>
    </>
  );
}
