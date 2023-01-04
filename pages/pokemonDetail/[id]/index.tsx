import { useRouter } from "next/router";
import PokemonDetail from "../../../components/pokemonList/pokemonDetail/PokemonDetail";

export default function PokemonDetailView() {
  const {
    query: { id },
  } = useRouter();
  const a = useRouter();
  return <PokemonDetail id={id} />;
}
