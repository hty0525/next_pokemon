import { useCallback, useEffect, useRef, useState } from "react";

export default function TYSlide() {
  const [curIdx, setCurIdx] = useState(0);
  const [isSlideStop, setIsSlideStop] = useState<Boolean>(false);

  const ary = new Array(10).fill(10);

  const moveNextSlide = useCallback(() => {
    if (curIdx >= ary.length) {
      setCurIdx(0);
    } else {
      setCurIdx((prev) => prev + 1);
    }
  }, [ary.length, curIdx]);

  const interval = useRef<any>(() => {});

  const movePrevSlide = () => {
    if (curIdx >= ary.length) {
      setCurIdx(0);
    } else {
      setCurIdx((prev) => prev + 1);
    }
  };

  const moveIndexSlide = (idx: number) => () => {
    setCurIdx(idx);
  };

  useEffect(() => {
    if (isSlideStop) {
      return () => clearInterval(interval.current);
    } else {
      interval.current = setInterval(() => {
        moveNextSlide();
      }, 3000);
    }

    return () => clearInterval(interval.current);
  }, [moveNextSlide, isSlideStop]);

  return (
    <article
      className="w-full overflow-hidden h-full relative"
      onMouseEnter={() => {
        setIsSlideStop(true);
      }}
      onMouseLeave={() => {
        setIsSlideStop(false);
      }}
    >
      <ul
        className="h-full border-4 flex flex-wrap"
        style={{
          width: `${ary.length * 100}%`,
          transform: `translateX(-${(100 / ary.length) * curIdx}%)`,
          transition: "all 1s",
        }}
      >
        {ary.map((_, idx) => (
          <li
            key={idx}
            className="border-4 border-black w-1/6 h-full"
            style={{ width: `${100 / ary.length}%` }}
          >
            item{idx}
          </li>
        ))}
      </ul>
      <ul className="absolute bottom-0 left-0 flex gap-x-5">
        {ary.map((_, idx) => (
          <li
            key={idx}
            className="w-10 h-10 bg-black rounded-full overflow-hidden"
            onClick={moveIndexSlide(idx)}
          >
            {idx}
          </li>
        ))}
      </ul>
    </article>
  );
}
