import { useGetPokemonDescQuery } from "../../../hook/usePokemonQuery";

export default function PokemonDetail({ id }: { id: string | string[] }) {
  const { data } = useGetPokemonDescQuery(id);
  console.log(id);
  console.log(data);
  return <div>{id}</div>;
}
