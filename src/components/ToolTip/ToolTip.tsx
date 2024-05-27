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
}

export function ToolTip({ position, children }: Props) {
  const [isHover, setIstHover] = useState(false);
  const targetRef = useRef(null);

  const handleMouseEnter = () => {
    setIstHover(true);
  };

  const handleMouseLeave = () => {
    setIstHover(false);
  };

  console.log(position);
  return (
    <div className="container">
      <div className="tooltip-wrap">
        <ToolTipPortals
          position={position}
          visible={isHover}
          targetRef={targetRef}
        >
          Prompt Text
          <br />
          Prompt Text
          <br />
          Prompt Text
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
