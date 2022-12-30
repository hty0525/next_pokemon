import { instance } from "../config/axiosInstance";

export const pokemonApis = {
  getPokemonList: async ({ pageParam = "pokemon/?offset=0&limit=18" }) => {
    try {
      const { data } = await instance.get(pageParam);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getPokemonImg: async (url = "") => {
    try {
      const {
        data: {
          sprites: {
            other: {
              home: { front_default },
            },
          },
        },
      } = await instance.get(url);
      return front_default;
    } catch (error) {
      return error;
    }
  },
};
