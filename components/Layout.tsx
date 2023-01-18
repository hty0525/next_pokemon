import Nav from "./nav/Nav";
import MainSlide from "./mainSlide/MainSlide";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <MainSlide />
      <header className="bg-white sticky top-0 z-50  h-24">
        <Nav />
      </header>
      <section className="max-w-[1200px] m-auto relative">{children}</section>
    </main>
  );
}
