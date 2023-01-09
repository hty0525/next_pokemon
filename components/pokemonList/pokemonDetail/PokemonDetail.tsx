import Head from "next/head";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import {
  useGetPokemonDescQuery,
  useGetPokemonInfoQuery,
} from "../../../hook/usePokemonQuery";
import { pokemonKoName } from "../../../static/pokemonKoName";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const queryClient = useQueryClient();

  const { data: name, isLoading: isNameLoading } = useGetPokemonDescQuery({
    id,
    key: "name",
  });
  const { data: imgUrl, isLoading: isImgLoading } = useGetPokemonInfoQuery({
    id,
    key: "imgUrl",
  });
  const { data: type } = useGetPokemonInfoQuery({ id, key: "type" });
  const { data: pokeClass } = useGetPokemonDescQuery({ id, key: "class" });
  const { data: pokeDesc } = useGetPokemonDescQuery({ id, key: "desc" });

  const pokemonName = pokemonKoName[name];

  return (
    <>
      {!isImgLoading && !isNameLoading && (
        <section className="w-full m-auto">
          <h1 className="">
            <span>{id}</span>
            {pokemonName}
          </h1>
          <ul className="grid grid-cols-2 gap-6">
            <li>
              <p>
                분류 <span className="block">{pokeClass}</span>
              </p>
              <div className="relative w-full pb-[100%]">
                <Image src={imgUrl} fill alt={pokemonName}></Image>
              </div>
            </li>
            <li>
              {pokeDesc?.map((desc: string) => (
                <p key={desc}>{desc}</p>
              ))}
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
