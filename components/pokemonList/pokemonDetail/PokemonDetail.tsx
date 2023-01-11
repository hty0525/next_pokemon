import Image from "next/image";

import {
  useGetPokemonDescQuery,
  useGetPokemonInfoQuery,
} from "../../../hook/usePokemonQuery";

import pokemonKoName from "../../../static/pokemonKoName";
import pokemonType from "../../../static/pokemonType";
import pokemonTypeColor from "../../../static/pokemonTypeColor";

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

  const { data: pokeClass, isLoading: isClassLoading } = useGetPokemonDescQuery(
    { id, key: "class" },
  );

  const { data: pokeDesc } = useGetPokemonDescQuery({ id, key: "desc" });

  const pokemonName = pokemonKoName[name];

  return (
    <>
      {!isImgLoading && !isNameLoading && !isTypeLoading && !isClassLoading && (
        <section className="w-full m-auto p-[5%] bg-white rounded-3xl border-4 border-gray-800">
          <ul className="flex gap-10 items-center">
            <li className="w-[55%]">
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
            <li>
              <div className="mb-10">
                <h3 className="text-4xl mb-5 text font-extrabold">
                  <p className="text-[0.55em] text-gray-400 leading-5 font-bold">
                    No.{" "}
                    {id.length < 2 ? `00${id}` : id.length < 3 ? `0${id}` : id}
                  </p>
                  {pokemonName}
                </h3>
              </div>
              <div>
                <div className="mb-5 text-l flex">
                  <div className="mr-3">
                    <Image
                      key={type}
                      src={`/image/smallMonsterBall.png`}
                      alt={pokemonName}
                      width="30"
                      height="30"
                    />
                  </div>
                  <p className="text-xl leading-6">{pokeDesc?.[0]}</p>
                </div>
              </div>
              <div className="flex text-l mb-5">
                <div>
                  <p className="mb-3 text-gray-400">타입</p>
                  <div className="flex mr-10">
                    {type?.map((type: string) => (
                      <div key={type} className="">
                        <Image
                          key={type}
                          src={`/image/pokemonTypesImg/${type}.png`}
                          alt={pokemonName}
                          width="50"
                          height="50"
                        />
                        <p className="text-center">{pokemonType[type]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-gray-400">분류</p>
                  <p>{pokeClass}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
