import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import Header from "./header/Header";
import MainSlide from "./mainSlide/MainSlide";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isMain = router.pathname === "/";
  const [saveScrollY, setSaveScrollY] = useState<number>(0);
  const [restoreScrollY, setRestoreScrollY] = useState<number>(0);

  useEffect(() => {
    const onRouteChangeStart = () => {
      setRestoreScrollY(saveScrollY);
      setSaveScrollY(window.scrollY);
    };
    const onRouteChangeComplete = () => {
      window.scroll(0, restoreScrollY);
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [saveScrollY, router, restoreScrollY]);

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
