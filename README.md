## 💡 토이 프로젝트 소개

- 주니어 프론트엔드 개발자를 희망하는 사람이 <br> next.js프레임워크와 여러가지 라이브러리 & openApi로 만든 포켓몬 도감 사이트

<br>

## 🗓️ 토이 프로젝트 진행 기간

- 2022/12/24 ~ ~~2023/01/19~~ 2023/02/02 ( 추가기능 및 리팩토링 약간 진행 )


<br>

## ✅ 토이 프로젝트 기능


<br>

### 1. 무한 스크롤

- IntersectionObserver와 useInfiniteQuery를 사용하여 스크롤의 최 하단에 내려갔을 때, <br> useInfiniteQuery가 동작하여 다음 데이터를 가져오고 모든 데이터를 가져왔을 때는 더이상 동작하지 않게 설정

<br>

### 2. 매 접속 or 새로고침마다 메인 슬라이드의 포켓몬 랜덤으로 보여주기

- 랜덤으로 10가지 숫자를 뽑고, 해당하는 번호의 포켓몬 데이터를<br>전역상태에 저장하여 새로고침과 다시 접속 할때만 포켓몬이 바뀌게 함
- 슬라이드를 라이브러리 없이 자체 구현 했으며, viewPort 따른 슬라이드 갯수가 달라지게 하기위해<br>useMediaQuery훅을 만들어 사용

```
function useMediaQuery(queryString: string) {
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

```

<br>

### 3. 포켓몬 검색하기

- 한글 검색을 적용하기 위해 포켓몬 이름 => 영문 : 한글 , 한글 : 영문 을 대칭시켜 만들었으며,<br>처음 렌더링 했을 시 모든 포켓몬의 데이터를 전역상태에 저장한 뒤 검색 했을 경우 전역상태에서 꺼내서 사용하게 끔 함

```
bulbasaur: "이상해씨",
이상해씨 : "bulbasaur"
```

이 방법이 좋지 않을 것 같은 생각은 했지만, 동작되게 한 뒤에 생각 하기 위해 동작은 시켰지만 아직까지 해답은 찾지 못한 상태

<br>

### 4. 반응형 UI적용

- PC, Tablet, Mobile 3가지로 분기점을 정해 반응형 UI를 제작

<br>

## 👨🏻‍💻 사용한 라이브러리 & 프레임워크

### 1. Next.js

- SSR, React프레임워크를 경험해보고 싶어서 사용했는데, 겉핧기로만 사용한 것 같아 아쉬움,,, page라우팅, 이미지 경로 등 기존 React만 사용 했을 때보다 훨씬 편하고 좋았습니다.

<br>

### 2. tailwindCSS

- 직관적인 css스타일링이 가능하여 사용했는데, 동적 스타일링은 불가능하여 아쉬운 모습을 보였습니다. postCSS와 같이 사용 했다면 달라졌을 수도 있었기 때문에 다음에는 postCSS도 사용해보는것으로,,,!

<br>

### 3. axios

- javaScript에서 기본적으로 제공해주는 Fetch api도 있지만, 익숙하기도 했고 범용성이 좋은 axios를 사용!

<br>

### 4. typeScript

- 동적타입에서 생기는 오류를 방지해주고, 내가 원하는 로직을 더 확실하게 사용할 수 있게 해주기 때문에 사용

<br>

### 5. React-query

- 서버에서 데이터를 받아오고, 체크하는데 편리해서 사용 했지만 거의 변화하지 않는 데이터를 받아올 때는, 굳이 사용하지 않아도 되지 않을까? 하는 생각이 듭니다.

<br>

### 6. jotai

- 흔히 알고있는 redux-tool-kit를 사용할까 했지만, jotai에 비해 사용법도 복잡하고 라이브러리 크기도 커서 jotai를 사용!

<br>

## ✅ 후기

블로그에는 두번째 후기! MVP를 완성하고 스켈레톤 UI, 반응형도 추가하고 큰 실수부터 작은 실수까지 하나하나 잡아가니 시간이 정말 더 많이 걸리게 된 것 같다. 그리고 이번에 next를 사용하는데 정말 그냥 겉핧기 식으로만 사용법을 익힌 것 같고 시작하기전 ssr csr 공부를 약간 했지만 정확하게 차이점이 나게끔 프로젝트를 만든것은 아닌 것 같다. 그리고 매번 생각하지만 일단 기능부터 동작하고 그 다음에 개선을 해야하는데, 그 점 도 아쉬운 그런 토이 프로젝트다. 진행하는 동안 부족함도 많이 느꼇고 기본기도 많이 부족하다 생각이 많이 든다. typescript를 사용 했지만 정말 기본적인 오류 잡기 정도의 용도로만 사용한 것 같아서 그 점도 상당히 찝찝하다. 기본기 공부도 차근차근 진행 해야겠다!
