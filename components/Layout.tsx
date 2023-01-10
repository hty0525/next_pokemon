import Nav from "./nav/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[1200px] m-auto relative">
      <Nav />
      {children}
    </main>
  );
}
