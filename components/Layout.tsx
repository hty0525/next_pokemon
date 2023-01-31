import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "./header/Header";
import MainSlide from "./mainSlide/MainSlide";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isMain = router.pathname === "/";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    console.log(scrollY);
    router.events.on("routeChangeStart", () => {
      console.log(123456);
      setScrollY(window.scrollY);
    });

    router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, scrollY);
    });

    // router.beforePopState(() => {
    //   console.log("beforePopState", router.asPath);
    //   console.log(
    //     "beforePopStatebeforePopStatebeforePopStatebeforePopStatebeforePopStatebeforePopState",
    //   );
    //   sessionStorage.setItem("nextPage", router.asPath);
    //   if (scrollY) {
    //     window.scrollTo(0, scrollY);
    //     sessionStorage.removeItem("scrollY");
    //   }
    //   return true;
    // });

    return () => {
      sessionStorage.setItem("scrollY", `${window.scrollY}`);
    };
  }, [router, scrollY]);

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
