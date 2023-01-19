import { useCallback, useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { pokemonAllListAtom } from "../../atom/atom";

import { IGetPokemonData } from "../../interface/pokemon";

import PokemonCard from "../pokemonList/pokemonCard/PokemonCard";

export default function MainSlide() {
  const [todayPokemon, setTodayPokemon] = useState<Array<IGetPokemonData>>([]);
  const pokemonAllList = useAtomValue(pokemonAllListAtom);

  useEffect(() => {
    if (pokemonAllList.length <= 1) {
      return;
    }
    const pokemonList = [];
    const duplicateCheck = new Set();

    while (pokemonList.length <= 4) {
      const randomNum = Math.floor(Math.random() * pokemonAllList.length + 1);
      if (duplicateCheck.has(randomNum)) {
        continue;
      }
      duplicateCheck.add(randomNum);
      pokemonList.push(pokemonAllList[randomNum]);
    }
    setTodayPokemon([
      pokemonList[pokemonList.length - 2],
      pokemonList[pokemonList.length - 1],
      ...pokemonList,
      pokemonList[0],
      pokemonList[1],
    ]);
  }, [pokemonAllList]);

  const delay = 2000;
  const gap = 0;
  const viewSlideNumber = 2;
  const transition = delay - 1000;

  const [curIdx, setCurIdx] = useState(0);
  const [slideTransition, setSlideTranstion] = useState(transition);

  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
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
    if (todayPokemon.length === 0) {
      return;
    }
    if (curIdx >= todayPokemon.length - 3) {
      setSlideTranstion(0);
      setCurIdx(0);
      setTimeout(() => {
        setSlideTranstion(transition);
        setCurIdx((prev) => prev + 1);
      }, 10);
    }
  }, [curIdx, todayPokemon.length, transition, slideTransition]);
  return (
    <section className="h-screen w-full relative flex items-center overflow-hidden">
      <article className="w-1/3 m-auto relative border-4 border-gray-800">
        <ul
          className="flex items-center m-auto"
          onMouseEnter={() => {
            // stopInterval();
          }}
          onMouseLeave={() => {
            // startInterval();
          }}
          style={{
            width: `${(todayPokemon.length * 100) / viewSlideNumber}%`,
            transform: `translateX(-${
              (100 / todayPokemon.length) * (curIdx + 2)
            }%)`,
            transition: `all ${slideTransition}ms`,
            columnGap: `${gap}rem`,
          }}
        >
          {todayPokemon?.map(({ name, url }, idx) => {
            const id = url.split("/")[url.split("/").length - 2];
            return (
              <li
                key={idx}
                style={{
                  width: `${100 / viewSlideNumber}%`,
                  margin: `1rem`,
                }}
              >
                <PokemonCard name={name} id={String(id)} />
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
