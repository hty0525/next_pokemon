import { useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { pokemonAllListAtom } from "../../atom/atom";

import useMediaQuery from "../../hook/useMediaQuery";

import { IGetPokemonData } from "../../interface/pokemon";

import PokemonCard from "../pokemonList/pokemonCard/PokemonCard";

export default function MainSlide() {
  const [todayPokemon, setTodayPokemon] = useState<Array<IGetPokemonData>>([]);
  const pokemonAllList = useAtomValue(pokemonAllListAtom);

  const pc = useMediaQuery("screen and (min-width:1024px)");
  const tablet = useMediaQuery("screen and (min-width:768px)");
  const mobile = useMediaQuery("screen and (min-width:320px)");

  const delay = 2500;
  const viewSlideNumber = pc ? 3 : tablet && mobile ? 2 : 1;
  const transition = 1000;

  const [curIdx, setCurIdx] = useState(0);
  const [slideTransition, setSlideTranstion] = useState(0);

  useEffect(() => {
    if (pokemonAllList.length <= 1) {
      return;
    }
    const pokemonList = [];
    const slideItemList = [];
    const duplicateCheck = new Set();

    while (pokemonList.length <= 9) {
      const randomNum = Math.floor(Math.random() * pokemonAllList.length);

      if (duplicateCheck.has(randomNum)) {
        continue;
      }
      duplicateCheck.add(randomNum);
      pokemonList.push(pokemonAllList[randomNum]);
      slideItemList.push(pokemonAllList[randomNum]);
    }
    for (let i = 1; i <= viewSlideNumber; i++) {
      slideItemList.push(pokemonList[i - 1]);
    }
    setTodayPokemon([...slideItemList]);
  }, [pokemonAllList, viewSlideNumber]);

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
      setTimeout(() => {
        setSlideTranstion(transition);
      }, delay - 1);
      return;
    }
    if (curIdx >= todayPokemon.length - viewSlideNumber + 1) {
      setSlideTranstion(0);
      setCurIdx(0);
      setTimeout(() => {
        setSlideTranstion(transition);
        setCurIdx((prev) => prev + 1);
      }, 10);
    }
  }, [
    curIdx,
    todayPokemon.length,
    transition,
    slideTransition,
    viewSlideNumber,
  ]);

  return (
    <section className="h-screen w-full relative flex items-center overflow-hidden">
      <article className="max-w-[1200px]  overflow-hidden border-gray-800 m-auto relative">
        <ul
          className="flex items-center m-auto"
          onMouseEnter={() => {
            stopInterval();
          }}
          onMouseLeave={() => {
            startInterval();
          }}
          style={{
            width: `${(todayPokemon.length * 100) / viewSlideNumber}%`,
            transform: `translateX(-${(100 / todayPokemon.length) * curIdx}%)`,
            transition: `all ${slideTransition}ms`,
          }}
        >
          {todayPokemon?.map(({ name, url }, idx) => {
            const id = url.split("/")[url.split("/").length - 2];
            return (
              <li
                key={idx}
                style={{
                  width: `${100 / viewSlideNumber}%`,
                  padding: `0 1rem`,
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
