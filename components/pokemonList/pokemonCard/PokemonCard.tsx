import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import Image from "next/image";

export default function PokemonCard({ name, url }: pokemonNameUrlI) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ url, key: "imgUrl" });

  return (
    <>
      <Image
        src={imgUrl ? imgUrl : "/image/monsterBall.png"}
        alt={name}
        width="500"
        height="500"
      />
    </>
  );
}
