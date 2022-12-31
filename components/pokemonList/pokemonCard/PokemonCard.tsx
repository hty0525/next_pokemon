import Image from "next/image";

import { pokemonNameUrlI } from "../../../interface/pokemonI";
import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";

export default function PokemonCard({ name, url }: pokemonNameUrlI) {
  const { data: imgUrl } = useGetPokemonInfoQuery({ url, key: "imgUrl" });
  const { data: id } = useGetPokemonInfoQuery({ url, key: "id" });

  return (
    <>
      <div className="relative h-[20em] border">
        <Image
          src={imgUrl ? imgUrl : "/image/monsterBall.png"}
          alt={pokemonKoName[name]}
          fill
          className="p-4"
        />
      </div>
      <p>{pokemonKoName[name]}</p>
    </>
  );
}
