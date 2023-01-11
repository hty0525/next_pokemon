import Nav from "./nav/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white h-24">
        <Nav />
      </header>
      <main className="max-w-[1200px] m-auto relative">{children}</main>
    </>
  );
}
