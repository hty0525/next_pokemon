import Skeleton from "./Skeleton";

export default function CardSkeleton() {
  return (
    <div className=" border-4 border-gray-600 rounded-2xl p-6 bg-white block select-none relative ">
      <div className="relative w-full pb-[100%] p-1 mb-3 bg-sk overflow-hidden">
        <Skeleton />
        <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
      </div>
      <div className=" flex justify-between w-full">
        <p className="text-3xl font-extrabold w-full mr-10 text-transparent bg-sk relative overflow-hidden">
          <p className="text-[0.6em] leading-5 font-bold w-full">No.</p>
          <p className="text-transparent">001</p>
          <Skeleton />
          <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
        </p>
        <div className=" w-full rounded-sm  bg-sk relative overflow-hidden">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
