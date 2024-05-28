# 테라인터내셔널 FE 과제 테스트_박채연 지원자
## 목차 (구현과제 내용)
1. <설명> props 인자값
2. <설명> project 구조
3. <설명> project 시작 방법
4. <과제> 툴팁 방향에 따라 다르게 구현
5. <과제> 부모 요소가 overflow hidden 혹은 scroll에도 보이게 구현
6. <과제> 나타남 혹은 사라짐은 사용가 원하면 delay로 동작 가능, delay 시간 값을 커스텀하게 전달 가능
7. <과제> 툴팁 호버 시 툴팁이 사라지지 않게 구현
8. <과제> 툴팁 내용은 string , number, icon, icon & string, 클릭 할 수 있는 button 등 여러가지 형태의 데이터를 표현
9. <과제> 스타일을 커스텀하게 설정
10. <과제> state 값에 의해 툴팁이 안뜨게 처리

## 1. props 인자값
```typescript
interface Props {
  children: ReactNode;
  position:
    | "TL"
    | "T"
    | "TR"
    | "LT"
    | "L"
    | "LB"
    | "RT"
    | "R"
    | "RB"
    | "BL"
    | "B"
    | "BR";
  message: string | number | ReactNode;
  enterDelay: number;
  leaveDelay: number;
  isHoverHidden: boolean;
  bgColor: string;
  disabled: boolean;
}
```
이렇게 Props를 받고 있으며 ToolTip 컴포넌트를 쓸 때 예시 입니다.
```typescript
<ToolTip
          disabled={false}  // 툴팁 활성화 여부
          enterDelay={0} // mouseEnter 이벤트 시 delay 값
          leaveDelay={0} // mouseLeave 이벤트 시 delay 값
          isHoverHidden={false} // 툴팁 호버 시 툴팁 보일 지 안보일 지 여부
          message={"Yellow"} // 툴팁에 보이는 메세지
          position="T" // 툴팁 위치
          bgColor="#edcc16" // 툴팁 배경 색상
        >
          <button className="button yellow">Yellow</button> // 툴팁을 감싸는 children 요소
</ToolTip>
```

## 2. project 구조
```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂ToolTip
 ┃ ┃ ┣ 📜ToolTip.tsx
 ┃ ┃ ┗ 📜Tooltip.scss
 ┃ ┗ 📂ToolTipPortals
 ┃ ┃ ┣ 📜ToolTipPortals.tsx
 ┃ ┃ ┗ 📜ToolTipsPortals.scss
 ┣ 📜App.scss
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 3. project 시작 방법
```
// git clone 후
npm install 
npm run dev
```
 
## 4. 툴팁 방향에 따라 다르게 구현
```typescript
type position = "TL"
    | "T"
    | "TR"
    | "LT"
    | "L"
    | "LB"
    | "RT"
    | "R"
    | "RB"
    | "BL"
    | "B"
    | "BR";
```
position이라는 값을 props으로 받았습니다.

```typescript
const { top, left, width, height } =
    targetRef.current.getBoundingClientRect();

  const getXPosition = (_positon: position, _top: number, _height: number) => {
    switch (_positon) {
      case "TL":
      case "T":
      case "TR":
        return _top - 5;
      case "BL":
      case "B":
      case "BR":
        return _top + _height + 5;
      case "LT":
      case "RT":
        return _top;
      case "L":
      case "R":
        return _top + _height / 2;
      case "LB":
      case "RB":
        return _top + _height;
      default:
        return _top - 5;
    }
  };

const getYposition = (_positon: position, _left: number, _width: number) => {
    switch (_positon) {
      case "TL":
      case "T":
      case "TR":
      case "BL":
      case "B":
      case "BR":
        return _left + _width / 2;
      case "LT":
      case "L":
      case "LB":
        return _left - 5;
      case "RT":
      case "R":
      case "RB":
        return _left + 5;
      default:
        return _left + _width / 2;
    }
  };

const style = {
    top: getXPosition(position, top, height),
    left: getYposition(position, left, width),
    width: width,
    backgroundColor: bgColor,
  };
```
버튼 요소의 useRef를 사용하여 `getBoundingClientRect()`를 통하여 top, left, width, height 값을 계산하도록 하였습니다. 그래서 X좌표와 Y좌표의 값을 계산하여 style에 동적으로 top과 left값을 넣었고 안맞는 부분은 css로 `transfrom : translate();`를 사용하여 바꿔주었습니다.<br />
툴팁 화살표 방향은 `::before` 요소를 사용하여 css로 border를 계산하여 화살표 방향을 다르게 표현하였습니다.

## 5. 부모 요소가 overflow hidden 혹은 scroll에도 보이게 구현
```typescript
return ReactDOM.createPortal(
    <div
      style={style}
      className={`portals ${position}`}
      onMouseEnter={() => {
        isHoverHidden && setIsHover(true);
      }}
      onMouseLeave={() => {
        isHoverHidden && setIsHover(false);
      }}
    >
      {children}
    </div>,
    document.body
  );
```
요구사항 중에 툴팁 컴포넌트로 감싸진 요소라고 명시되어 있습니다. 그래서 툴팁 컴포넌트 내부에 툴팁이 존재하게 되고 부모 요소가 overflow hidden 또는 scroll일 때는 자연스럽게 안보이게 됩니다. 이를 해결하기 위해 `React.createPortal`를 사용하였습니다. 리액트는 root id를 가진 div에 모든 컴포넌트가 생성이 되는데 이는 root id가 아닌 별개의 또 다른 곳에 node가 생성이 가능합니다. 그래서 별도로 생성되게 하여 분리하여 부모 상위에서 보이게 구현하였습니다.

## 6. 나타남 혹은 사라짐은 사용가 원하면 delay로 동작 가능, delay 시간 값을 커스텀하게 전달 가능
```typescript
interface Props {
  enterDelay: number;
  leaveDelay: number;
}
```
Props로 enterDelay와 leaveDelay 값을 받았습니다.

```typescript
const enterTimeout = useRef<number | null>(null);
const leaveTimeout = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    if (enterDelay === 0) {
      !disabled && setIsHover(true);
    } else {
      enterTimeout.current = setTimeout(() => {
        !disabled && setIsHover(true);
      }, enterDelay);
    }
  };

  const handleMouseLeave = () => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = null;
    }
    if (leaveDelay === 0) {
      !disabled && setIsHover(false);
    } else {
      leaveTimeout.current = setTimeout(() => {
        !disabled && setIsHover(false);
      }, leaveDelay);
    }
  };
```
이 과제에서는 `setTimeout`를 활용하여 구현과제를 해결하였습니다. enterDelay 값이 0일 때, leaveDelay 값이 0일 때에는 `setState`를 사용하여 즉시 값을 바꿔주고 return을 해주어 비동기 호출로 인해 0일 때 제대로 동작하지 않아 0일 때 조건을 걸어서 해결하였습니다. 그리고 enterTimeout과 leaveTimeout를 useRef로 감싸서 current 값에 `setTimeout` 값을 넣었고 mouseEnter 일 때 leaveTimeout.current 혹은 mouseLeave 일 때 enterTimeout.current 값을 null로 주어 mouseEnter일 때에 enterTimeout만 실행되고, mouseLeave일 때 leaveTimeout만 실행되게 하여 버그를 방지하였습니다.

## 7. 툴팁 호버 시 툴팁이 사라지지 않게 구현
```typescript
 type isHoverHidden = boolean;
```
툴팁 호버 시 툴팁이 나타날 지 사라질 지의 boolean 값을 인자로 받습니다.
```typescript
return ReactDOM.createPortal(
    <div
      style={style}
      className={`portals ${position}`}
      onMouseEnter={() => {
        isHoverHidden && setIsHover(true);
      }}
      onMouseLeave={() => {
        isHoverHidden && setIsHover(false);
      }}
    >
      {children}
    </div>,
    document.body
  );
```
위의 div 태그가 툴팁을 나타내는 태그인데 마우스 이벤트를 걸어서 `isHoverHidden === true`일 때 `setState`를 걸어주어 툴팁 호버 시 툴팁이 나타나고 사라지게 됩니다.

## 8. 툴팁 내용은 string , number, icon, icon & string, 클릭 할 수 있는 button 등 여러가지 형태의 데이터를 표현
```typescript
 type message =  string | number | ReactNode;
```
message라는 Props를 별도로 받아 이 타입을 string, number 혹은 icon과 string, 클릭 할 수 있는 button 등 ReactNode를 받을 수 있게 설정하였습니다.

## 9. 스타일을 커스텀하게 설정
```typescript
  type bgColor = string;
```
bgColor라는 값을 Props으로 별도로 받습니다.
```typescript
 const style = {
    top: getXPosition(position, top, height),
    left: getYposition(position, left, width),
    width: width,
    backgroundColor: bgColor,
  };
```
style을 동적으로 backgroundColor에 bgColor 값을 넣어서 구현 과제를 수행하였습니다. 툴팁 화살표에는 해당 값이 변경되어 있지 않은데 SCSS를 쓸 경우에는 bgColor를 동적으로 줄 수 없기 때문에 바꿀 방법이 없습니다. 이는 `styled-components`를 사용하여 해결할 수 있습니다.

## 10. state 값에 의해 툴팁이 안뜨게 처리 
```typescript
  type disabled = boolean;
```
disabled의 유무의 boolean값을 별도로 Props로 받았습니다.
```typescript
!disabled && setIsHover(false);
// !disabled && setIsHover(true);
```
핵심 코드만 적었는데 `disabled === true`은 툴팁이 안뜨게 처리하기 때문에 `!disabled`일 때만 `setState`가 작동되게 구현하였습니다.
