import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPoketImgUrl } from "../../../hook/usePokemonQuery";

import Image from "next/image";

export default function PokemonCard({ name, url }: pokemonNameUrlI) {
  const { data } = useGetPoketImgUrl(url);

  return (
    <>
      <Image
        src={data ? data : "/image/monsterBall.png"}
        alt={name}
        width="500"
        height="500"
      />
    </>
  );
}
