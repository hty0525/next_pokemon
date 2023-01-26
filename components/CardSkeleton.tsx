import Image from "next/image";

export default function CardSkeleton() {
  return (
    <li className=" border-4 border-gray-600 rounded-2xl p-6 bg-white block select-none relative ">
      <div className="relative w-full pb-[100%] p-1 mb-3 bg-[#f2f2f2] overflow-hidden">
        <Image
          className="p-4 opacity-0"
          fill
          src={"/image/monsterBall.png"}
          alt={"로딩 이미지"}
          sizes="100vw,100vh"
          priority
          style={{
            objectFit: "contain",
          }}
        />
        <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg-skeleton"></div>
        <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
      </div>
      <div className=" flex justify-between w-full">
        <h3 className="text-3xl font-extrabold w-full mr-10 indent-[-9999px] bg-[#f2f2f2] relative overflow-hidden">
          <p className="text-[0.4em] leading-5 font-bold w-full text-gray-100">
            Skeleton
          </p>
          <p className="indent-[-9999px] ">Skeleton</p>
          <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg-skeleton"></div>
          <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
        </h3>
        <div className=" w-full rounded-sm  bg-[#f2f2f2] relative overflow-hidden">
          <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg-skeleton"></div>
        </div>
      </div>
    </li>
  );
}
