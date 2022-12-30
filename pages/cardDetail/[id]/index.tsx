import { useRouter } from "next/router";

export default function CardDetail() {
  const {
    query: { id: indexId },
  } = useRouter();

  return <div>CardDetail</div>;
}
