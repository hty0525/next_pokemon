import { useRouter } from "next/router";
import { useEffect } from "react";

import Header from "./header/Header";
import MainSlide from "./mainSlide/MainSlide";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isMain = router.pathname === "/";
  useEffect(() => {
    history.scrollRestoration = "auto";
  }, []);

  return (
    <main className="relative">
      {isMain && <MainSlide />}
      <Header />
      <section className="max-w-[1200px] m-auto relative px-3">
        {children}
      </section>
    </main>
  );
}
