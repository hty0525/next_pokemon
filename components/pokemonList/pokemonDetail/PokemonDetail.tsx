import Image from "next/image";

import {
  useGetPokemonDescQuery,
  useGetPokemonInfoQuery,
} from "../../../hook/usePokemonQuery";

import DetailSkeleton from "../../skeleton/DetailSkeleton";

import pokemonKoName from "../../../static/pokemonKoName";
import pokemonType from "../../../static/pokemonType";

import { useDetailQuery } from "../../../hook/usePokemonQuery";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data: name, isLoading: isNameLoading } = useGetPokemonDescQuery({
    id,
    key: "Name",
  });
  const { data: pokeClass, isLoading: isClassLoading } = useGetPokemonDescQuery(
    { id, key: "Class" },
  );

  const { data: pokeDesc } = useGetPokemonDescQuery({ id, key: "Desc" });

  const { data: imgUrl, isLoading: isImgLoading } = useGetPokemonInfoQuery({
    id,
    key: "ImgUrl",
  });

  const { data: type, isLoading: isTypeLoading } = useGetPokemonInfoQuery({
    id,
    key: "Type",
  });

  const result = useDetailQuery({
    id,
  });

  console.log(result);

  const pokemonName = pokemonKoName[name];

  return (
    <article className="h-[calc(100vh-6rem)] flex items-center ">
      <DetailSkeleton />
      {/* {!isImgLoading && !isNameLoading && !isTypeLoading && !isClassLoading && (
        <section className="w-full flex items-center m-auto h-3/4 bg-white rounded-3xl border-4 border-gray-800">
          <ul className="flex gap-14 items-center w-full px-[5%]">
            <li className="w-[45%]">
              <div className="relative w-full pb-[100%]">
                <Image
                  src={imgUrl}
                  alt={pokemonName}
                  fill
                  priority
                  sizes="auto"
                ></Image>
              </div>
            </li>
            <li className="flex-1">
              <h3 className="text-5xl mb-10 text font-extrabold">
                <p className="text-[0.4em] text-gray-400 leading-5 font-bold">
                  No.{" "}
                  {id.length < 2 ? `00${id}` : id.length < 3 ? `0${id}` : id}
                </p>
                {pokemonName}
              </h3>
              <div className="mb-10 text-l">
                <p className="text-2xl ">{pokeDesc}</p>
              </div>
              <div className="flex text-xl">
                <div className="text-center mr-10">
                  <p className="mb-4 text-gray-400">타입</p>
                  <div className="flex gap-3">
                    {type?.map((type: string) => (
                      <div key={type}>
                        <Image
                          key={type}
                          src={`/image/pokemonTypesImg/${type}.png`}
                          alt={pokemonName}
                          width="50"
                          height="50"
                        />
                        <p className="text-center mt-2">{pokemonType[type]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-gray-400">분류</p>
                  <p>{pokeClass}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      )} */}
    </article>
  );
}
