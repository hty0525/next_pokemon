import { useGetPokemonDescQuery } from "../../../hook/usePokemonQuery";

export default function PokemonDetail({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const { data } = useGetPokemonDescQuery(id ?? "1");
  console.log(data);
  return <div>{id}</div>;
}
