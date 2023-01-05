import { instance } from "../config/axiosInstance";

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

  getPokemonInfo: async ({ url }: { url: string }) => {
    try {
      const { data } = await instance.get(url);
      return data;
    } catch (error) {
      return error;
    }
  },
  getPokemonDesc: async (id: string | string[]) => {
    try {
      const { data } = await instance.get(`pokemon-species/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  },
};
