export default function SlideWrap() {
  const ary = new Array(10).fill(10);
  console.log(ary.length * 100);
  return (
    <ul
      className="h-full relative border-4 flex flex-wrap"
      style={{ width: `${ary.length * 100}%` }}
    >
      {new Array(10).fill(10).map((_, idx) => (
        <li
          key={idx}
          className="border-4 border-black w-1/6 h-full"
          style={{ width: `2.5%` }}
        >
          item
        </li>
      ))}
    </ul>
  );
}
