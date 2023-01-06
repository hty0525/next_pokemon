import { useGetPokemonDescQuery } from "../../../hook/usePokemonQuery";
import { pokemonKoName } from "../../../static/pokemonKoName";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data: name } = useGetPokemonDescQuery({ id });
  const pokemonName = pokemonKoName[name?.name];

  return <div>{pokemonName}</div>;
}
