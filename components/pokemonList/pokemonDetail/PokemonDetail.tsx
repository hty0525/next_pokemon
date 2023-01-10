import classNames from "classnames";
import Image from "next/image";

import {
  useGetPokemonDescQuery,
  useGetPokemonInfoQuery,
} from "../../../hook/usePokemonQuery";

import { pokemonKoName } from "../../../static/pokemonKoName";
import { pokemonTypeColor } from "../../../static/pokemonTypeColor";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data: name, isLoading: isNameLoading } = useGetPokemonDescQuery({
    id,
    key: "name",
  });
  const { data: imgUrl, isLoading: isImgLoading } = useGetPokemonInfoQuery({
    id,
    key: "imgUrl",
  });
  const { data: type, isLoading: isTypeLoading } = useGetPokemonInfoQuery({
    id,
    key: "type",
  });
  const { data: pokeClass } = useGetPokemonDescQuery({ id, key: "class" });
  const { data: pokeDesc } = useGetPokemonDescQuery({ id, key: "desc" });

  const pokemonName = pokemonKoName[name];
  const pokemonNumColor = pokemonTypeColor[type?.[0]];
  console.log(pokemonNumColor);

  return (
    <>
      {!isImgLoading && !isNameLoading && !isTypeLoading && (
        <section className="w-full m-auto">
          <h1 className="text-center ">
            <p className="shadow-md inline-block rounded-full leading-7 pr-3">
              <span
                className={`text-white px-3 rounded-full mr-2 inline-block ${
                  pokemonNumColor ? `bg-blue-600` : "bg-blue-300"
                }`}
              >
                {id}
              </span>
              {pokemonName}
            </p>
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
