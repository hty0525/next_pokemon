import Image from "next/image";

import Skeleton from "./Skeleton";

export default function DetailSkeleton() {
  return (
    <section className="w-full flex items-center m-auto md:h-3/4 bg-white rounded-3xl border-4 border-gray-800 select-none">
      <ul className="flex gap-14 items-center w-full flex-col md:flex-row p-[10%] md:px-[5%]">
        <li className="md:w-[40%] w-full p-[5%]">
          <div className="relative w-full pb-[100%] bg-sk rounded-xl bg overflow-hidden">
            <Image
              className="opacity-0"
              src={"/image/monsterBall.png"}
              alt={"Skeleton"}
              fill
              priority
              sizes="auto"
            ></Image>
            <Skeleton />
          </div>
        </li>
        <li className="flex-1">
          <h3 className="text-3xl md:text-4xl lg:text-5xl mb-10">
            <div className="overflow-hidden relative text-[0.4em] inline-block  leading-5 font-bold text-transparent bg-sk">
              No.
              <Skeleton />
            </div>
            <br></br>
            <div className="overflow-hidden relative text-transparent inline-block bg-sk">
              포켓몬 번호
              <Skeleton />
            </div>
          </h3>
          <div className="mb-10 text-l">
            <div className="overflow-hidden relative text-xl lg:text-2xl text-transparent bg-sk w-3/4">
              포켓몬 설명
              <Skeleton />
            </div>
          </div>
          <div className="flex lg:text-xl">
            <div className="text-center mr-10">
              <div className="overflow-hidden relative mb-4  text-transparent bg-sk">
                타입
                <Skeleton />
              </div>
              <div className="flex gap-3 relative overflow-hidden">
                <Skeleton />
                <div className="overflow-hidden relative bg-sk">
                  <Image
                    className="opacity-0 "
                    src={`/image/monsterBall.png`}
                    alt={"Skeleton"}
                    width="50"
                    height="50"
                  />
                  <Skeleton />
                  <div className="overflow-hidden relative text-center mt-2 text-transparent bg-sk">
                    타입이름
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden relative mb-4 bg-sk w-full text-transparent">
                분류
                <Skeleton />
              </div>
              <div className="overflow-hidden relative bg-sk text-transparent">
                분류 이름
                <Skeleton />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
