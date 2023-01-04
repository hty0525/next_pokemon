import { instance } from "../config/axiosInstance";
import { getPokemonInfoI } from "../interface/pokemonI";

export const pokemonApis = {
  getPokemonList: async ({ pageParam }: { pageParam: number }) => {
    try {
      let limit = 20;
      if (pageParam >= 240) {
        limit = 11;
      }
      const { data } = await instance.get(
        `pokemon/?offset=${pageParam}&limit=${limit}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },

  getPokemonAllList: async () => {
    const { data } = await instance.get("pokemon/?offset=0&limit=251");
    return data;
  },

  getPokemonImgId: async ({ url }: { url: string }) => {
    try {
      const { data } = await instance.get(url);
      return data;
    } catch (error) {
      return error;
    }
  },
  getPokemonInfo: async () => {
    try {
      const { data } = await instance.get("/");
      return data;
    } catch (error) {
      return error;
    }
  },
};
