import { useCallback, useEffect, useRef, useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import { todayPokemonAtom } from "../../atom/atom";

export default function MainSlide() {
  const [curIdx, setCurIdx] = useState(0);

  const delay = 3000;
  const ary = new Array(10).fill(10);

  const todayPokemon = useAtomValue(todayPokemonAtom);
  console.log(todayPokemon);

  const moveNextSlide = useCallback(() => {
    if (curIdx >= ary.length - 1) {
      setCurIdx(0);
    } else {
      setCurIdx((prev) => prev + 1);
    }
  }, [ary.length, curIdx]);

  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setCurIdx((prevIdx) => prevIdx + 1);
    }, delay);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(curIdx);
    if (curIdx >= ary.length) setCurIdx(0);
  }, [curIdx, ary.length]);

  return (
    <section className="h-screen w-full relative p-[10%] overflow-hidden flex items-center justify-center">
      <article
        className="w-full overflow-hidden h-full relative"
        onMouseEnter={() => {
          stopInterval();
        }}
        onMouseLeave={() => {
          startInterval();
        }}
      >
        <ul
          className="h-full border-4 flex w-full"
          style={{
            transform: `translateX(-${33.333 * curIdx}%)`,
            transition: `all ${delay - 1000}ms`,
          }}
        >
          {ary.map((_, idx) => (
            <li
              key={idx}
              className="border-4 border-black w-1/3 h-full shrink-0"
            >
              item{idx}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
