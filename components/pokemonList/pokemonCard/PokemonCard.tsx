import { memo } from "react";
import Image from "next/image";

import { IPokemonCard } from "../../../interface/pokemon";

import { useGetPokemonInfoQuery } from "../../../hook/usePokemonQuery";

import pokemonKoName from "../../../static/pokemonKoName";

import Link from "next/link";
import CardSkeleton from "../../skeleton/CardSkeleton";

export default memo(function PokemonCard({ name, id }: IPokemonCard) {
  const { data: imgUrl, isSuccess: imgUrlSisSuccess } = useGetPokemonInfoQuery({
    id,
    key: "ImgUrl",
  });
  const { data: type, isSuccess: typeSisSuccess } = useGetPokemonInfoQuery({
    id,
    key: "Type",
  });
  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const pokemonName = checkKo.test(name) ? name : pokemonKoName[name];

  const isSuccess = typeSisSuccess && imgUrlSisSuccess;

  return (
    <>
      {!isSuccess ? (
        <CardSkeleton />
      ) : (
        <Link
          className="border-4 border-gray-600 rounded-2xl p-6 bg-white block"
          href={{
            pathname: `/${id}`,
          }}
        >
          <>
            <div className="relative w-full pb-[100%] border-4 border-gray-400 mb-3">
              <Image
                className="p-4"
                fill
                src={imgUrl}
                alt={pokemonName}
                sizes="100vw,100vh"
                priority
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-extrabold">
                <p className="text-[0.6em] text-gray-600 leading-5 font-semibold">
                  No.{" "}
                  {id.length < 2 ? `00${id}` : id.length < 3 ? `0${id}` : id}
                </p>
                {pokemonName}
              </p>
              <div className="flex">
                {type?.map((type: string) => (
                  <div key={type}>
                    <Image
                      src={`/image/pokemonTypesImg/${type}.png`}
                      alt={pokemonName}
                      priority
                      width={40}
                      height={40}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        </Link>
      )}
    </>
  );
});
