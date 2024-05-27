import { ReactNode, RefObject } from "react";
import ReactDOM from "react-dom";
import "./ToolTipsPortals.scss";

type position =
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

interface Props {
  children: ReactNode;
  targetRef: RefObject<HTMLElement>;
  visible: boolean;
  position: position;
}

const ToolTipPortals = ({ children, targetRef, visible, position }: Props) => {
  if (!targetRef.current || !visible) {
    return null;
  }

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
  };

  return ReactDOM.createPortal(
    <div style={style} className={`portals ${position}`}>
      {children}
    </div>,
    document.body
  );
};

export default ToolTipPortals;
