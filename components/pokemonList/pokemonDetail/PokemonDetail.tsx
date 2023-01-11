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
        <section className="w-full m-auto px-[5%]">
          <ul className="flex gap-10">
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
              <div>
                <h3 className="text-4xl mb-5 text font-extrabold">
                  <p className="text-[0.55em] text-gray-400 leading-5 font-bold">
                    No.{" "}
                    {id.length < 2 ? `00${id}` : id.length < 3 ? `0${id}` : id}
                  </p>
                  {pokemonName}
                </h3>
              </div>
              <div>
                {pokeDesc?.map((desc: string) => (
                  <div key={desc} className="mb-5 text-l">
                    <Image
                      className="inline-block"
                      key={type}
                      src={`/image/smallMonsterBall.png`}
                      alt={pokemonName}
                      width="25"
                      height="25"
                    />
                    {desc}
                  </div>
                ))}
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
