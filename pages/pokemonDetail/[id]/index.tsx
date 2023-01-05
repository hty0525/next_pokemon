import { useRouter } from "next/router";
import PokemonDetail from "../../../components/pokemonList/pokemonDetail/PokemonDetail";

export default function PokemonDetailView() {
  const {
    query: { id },
  } = useRouter();
  return <PokemonDetail id={id} />;
}
