import { useCallback, useEffect, useRef, useState } from "react";

import { useAtomValue, useAtom } from "jotai";

import {
  pokemonAllListAtom,
  slideCurIndex,
  todayPokemonAtomNum,
} from "../../atom/atom";

import useMediaQuery from "../../hook/useMediaQuery";

import PokemonCard from "../pokemonList/pokemonCard/PokemonCard";
import { IGetPokemonData } from "../../interface/pokemon";

export default function MainSlide() {
  const [todayPokemonNum, setTodayPokemonNum] = useAtom(todayPokemonAtomNum);
  const [todayPokemonList, setTodayPokemonList] = useState<
    Array<IGetPokemonData>
  >([]);
  const pokemonAllList = useAtomValue(pokemonAllListAtom);

  const pc = useMediaQuery("screen and (min-width:1024px)");
  const tablet = useMediaQuery("screen and (min-width:768px)");
  const mobile = useMediaQuery("screen and (min-width:320px)");

  const delay = 2500;
  const viewSlideNumber = pc ? 3 : tablet && mobile ? 2 : 1;
  const transition = 1000;

  const [curIdx, setCurIdx] = useAtom(slideCurIndex);
  const [slideTransition, setSlideTranstion] = useState(0);

  useEffect(() => {
    if (pokemonAllList.length <= 1) {
      return;
    }
    const pokemonNum: Array<number> = [];
    const slideItemList = [];
    const selectedPokemonList = [];
    const duplicateCheck = new Set();

    if (todayPokemonNum.length === 0) {
      while (pokemonNum.length <= 9) {
        const randomNum = Math.floor(Math.random() * pokemonAllList.length);

        if (duplicateCheck.has(randomNum)) {
          continue;
        }
        duplicateCheck.add(randomNum);
        pokemonNum.push(randomNum);
        slideItemList.push(pokemonAllList[randomNum]);
        selectedPokemonList.push(pokemonAllList[randomNum]);
      }
      setTodayPokemonNum(pokemonNum);
    } else {
      for (let i of todayPokemonNum) {
        slideItemList.push(pokemonAllList[i]);
        selectedPokemonList.push(pokemonAllList[i]);
      }
    }

    for (let i = 1; i <= viewSlideNumber; i++) {
      slideItemList.push(selectedPokemonList[i - 1]);
    }

    setTodayPokemonList(slideItemList);
  }, [pokemonAllList, viewSlideNumber, , setTodayPokemonNum, todayPokemonNum]);

  const intervalRef = useRef<number | null>(null);

  const startInterval = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      setCurIdx((prevIdx) => prevIdx + 1);
    }, delay);
  }, [setCurIdx]);

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
  }, [startInterval]);

  useEffect(() => {
    if (todayPokemonList.length === 0) {
      setTimeout(() => {
        setSlideTranstion(transition);
      }, delay - 1);
      return;
    }
    if (curIdx >= todayPokemonList.length - viewSlideNumber + 1) {
      setSlideTranstion(0);
      setCurIdx(0);
      setTimeout(() => {
        setSlideTranstion(transition);
        setCurIdx((prev) => prev + 1);
      }, 10);
    }
  }, [
    curIdx,
    todayPokemonList.length,
    transition,
    slideTransition,
    viewSlideNumber,
    setCurIdx,
  ]);

  return (
    <section className="h-screen w-full relative flex items-center overflow-hidden">
      <article className="max-w-[1200px] overflow-hidden m-auto relative">
        <ul
          className="flex items-center m-auto"
          onMouseEnter={() => {
            stopInterval();
          }}
          onMouseLeave={() => {
            startInterval();
          }}
          style={{
            width: `${(todayPokemonList.length * 100) / viewSlideNumber}%`,
            transform: `translateX(-${
              (100 / todayPokemonList.length) * curIdx
            }%)`,
            transition: `all ${slideTransition}ms`,
          }}
        >
          {todayPokemonList?.map(({ name, url }, idx) => {
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
