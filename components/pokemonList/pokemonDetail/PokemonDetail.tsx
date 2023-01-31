import Image from "next/image";

import {
  useGetPokemonDescQuery,
  useGetPokemonInfoQuery,
} from "../../../hook/usePokemonQuery";

import DetailSkeleton from "../../skeleton/DetailSkeleton";

import pokemonKoName from "../../../static/pokemonKoName";
import pokemonType from "../../../static/pokemonType";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data: name, isSuccess: isNameisSuccess } = useGetPokemonDescQuery({
    id,
    key: "Name",
  });
  const { data: pokeClass, isSuccess: isClassisSuccess } =
    useGetPokemonDescQuery({ id, key: "Class" });

  const { data: pokeDesc } = useGetPokemonDescQuery({ id, key: "Desc" });

  const { data: imgUrl, isSuccess: isImgisSuccess } = useGetPokemonInfoQuery({
    id,
    key: "ImgUrl",
  });

  const { data: type, isSuccess: isTypeisSuccess } = useGetPokemonInfoQuery({
    id,
    key: "Type",
  });

  const pokemonName = pokemonKoName[name];

  const isSuccess =
    isImgisSuccess && isNameisSuccess && isTypeisSuccess && isClassisSuccess;

  return (
    <article className="pt-10 md:h-[calc(100vh-6rem)] flex items-center ">
      {!isSuccess ? (
        <DetailSkeleton />
      ) : (
        <section className="w-full flex items-center m-auto md:h-3/4 bg-white rounded-3xl border-4 border-gray-800">
          <ul className="flex gap-14 items-center w-full flex-col md:flex-row p-[10%] md:px-[5%]">
            <li className="md:w-[40%] w-full p-[5%]">
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
              <h3 className="text-3xl md:text-4xl lg:text-5xl mb-10 font-extrabold">
                <p className="text-[0.4em] text-gray-400 leading-5 font-bold">
                  No.{" "}
                  {id.length < 2 ? `00${id}` : id.length < 3 ? `0${id}` : id}
                </p>
                {pokemonName}
              </h3>
              <div className="mb-10">
                <p className="text-xl lg:text-2xl">{pokeDesc}</p>
              </div>
              <div className="flex lg:text-xl">
                <div className="text-center mr-10">
                  <p className="mb-4 text-gray-400">타입</p>
                  <div className="flex gap-3">
                    {type?.map((type: string) => (
                      <div key={type}>
                        <Image
                          key={type}
                          src={`/image/pokemonTypesImg/${type}.png`}
                          alt={pokemonName ?? "포켓몬 사진"}
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
      )}
    </article>
  );
}
