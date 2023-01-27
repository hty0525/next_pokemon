import { useState, useEffect } from "react";

export default function useMediaQuery(queryString: string) {
  const [isMatched, setIsMatched] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString);
    if (mediaQueryList.matches) {
      setIsMatched(true);
    }
    function onViewportChanged(event: MediaQueryListEvent) {
      const { matches } = event;
      if (matches) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    }
    mediaQueryList.addEventListener("change", onViewportChanged);
    return () => {
      mediaQueryList.removeEventListener("change", onViewportChanged);
    };
  }, [queryString]);

  return isMatched;
}
