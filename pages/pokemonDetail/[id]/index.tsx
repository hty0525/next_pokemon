import { useRouter } from "next/router";
import PokemonDetail from "../../../components/pokemonList/pokemonDetail/PokemonDetail";

export default function PokemonDetailView() {
  const router = useRouter();
  const { id } = router.query;
  return <>{id && <PokemonDetail id={id} />}</>;
}
