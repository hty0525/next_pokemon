import { instance } from "../config/axiosInstance";
import { getPokemonInfoI } from "../interface/pokemonI";

export const pokemonApis = {
  getPokemonList: async ({ pageParam = "pokemon/?offset=0&limit=20" }) => {
    try {
      const { data } = await instance.get(pageParam);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getPokemonAllList: async () => {
    const { data } = await instance.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898",
    );
    return data;
  },

  getPokemonInfo: async ({ url, key }: getPokemonInfoI) => {
    try {
      const { data } = await instance.get(url);
      switch (key) {
        case "imgUrl":
          return data?.sprites?.other?.dream_world.front_default;

        case "id":
          return data?.id;

        default:
          return data;
      }
    } catch (error) {
      return error;
    }
  },
};
