import { useGetPokemonDescQuery } from "../../../hook/usePokemonQuery";
import { pokemonKoName } from "../../../static/pokemonKoName";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data } = useGetPokemonDescQuery({ id });
  const pokemonName = pokemonKoName[data?.name];

  return <div>{pokemonName}</div>;
}
