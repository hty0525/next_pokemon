import Skeleton from "./Skeleton";

export default function CardSkeleton() {
  return (
    <div className=" border-4 border-gray-600 rounded-2xl div-6 bg-white block select-none p-5">
      <div className="relative w-full pb-[100%] div-1 mb-3 bg-sk overflow-hidden">
        <Skeleton />
        <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
      </div>
      <div className=" flex justify-between w-full">
        <div className="text-3xl font-extrabold w-full mr-10 text-transparent bg-sk relative overflow-hidden">
          <div className="text-[0.6em] leading-5 font-bold w-full">No.</div>
          <div className="text-transparent">001</div>
          <Skeleton />
          <div className="top-0 left-0 absolute animate-skeleton w-4 h-full bg"></div>
        </div>
        <div className=" w-full rounded-sm  bg-sk relative overflow-hidden">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
