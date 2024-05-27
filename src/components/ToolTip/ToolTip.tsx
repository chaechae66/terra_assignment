import { ReactNode, useRef, useState } from "react";
import "./Tooltip.scss";
import ToolTipPortals from "../ToolTipPortals/ToolTipPortals";

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
}

export function ToolTip({ position, children, message }: Props) {
  const [isHover, setIstHover] = useState(false);
  const targetRef = useRef(null);

  const handleMouseEnter = () => {
    setIstHover(true);
  };

  const handleMouseLeave = () => {
    setIstHover(false);
  };

  return (
    <div className="container">
      <div className="tooltip-wrap">
        <ToolTipPortals
          position={position}
          visible={isHover}
          targetRef={targetRef}
        >
          {message}
        </ToolTipPortals>
        <div
          ref={targetRef}
          className="content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
