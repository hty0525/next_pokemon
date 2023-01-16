import SlideWrap from "./SlideWrap";

export default function Slide() {
  return (
    <section className="h-screen w-full relative p-[10%] overflow-hidden flex items-center justify-center">
      <article className="w-full overflow-hidden">
        <SlideWrap />
      </article>
    </section>
  );
}
