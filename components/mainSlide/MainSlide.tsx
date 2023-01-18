import { useCallback, useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { pokemonAllListAtom } from "../../atom/atom";

import { IGetPokemonData } from "../../interface/pokemon";

import PokemonCard from "../pokemonList/pokemonCard/PokemonCard";

export default function MainSlide() {
  const [todayPokemon, setTodayPokemon] = useState<Array<IGetPokemonData>>([]);
  const [curIdx, setCurIdx] = useState(0);

  const delay = 3000;
  const ary = new Array(10).fill(10);

  const pokemonAllList = useAtomValue(pokemonAllListAtom);

  useEffect(() => {
    if (pokemonAllList.length <= 1) {
      return;
    }
    const pokemonList = [];
    const duplicateCheck = new Set();

    while (pokemonList.length <= 9) {
      const randomNum = Math.floor(Math.random() * pokemonAllList.length + 1);
      if (duplicateCheck.has(randomNum)) {
        continue;
      }
      duplicateCheck.add(randomNum);
      pokemonList.push(pokemonAllList[randomNum]);
    }
    setTodayPokemon(pokemonList);
  }, [pokemonAllList]);

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
    // startInterval();
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
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
          {todayPokemon?.map(({ name, url }) => {
            const id = url.split("/")[url.split("/").length - 2];
            return <PokemonCard key={name} name={name} id={String(id)} />;
          })}
        </ul>
      </article>
    </section>
  );
}
