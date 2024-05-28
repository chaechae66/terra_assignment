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
  enterDelay: number;
  leaveDelay: number;
  isHoverHidden: boolean;
}

export function ToolTip({
  position,
  children,
  message,
  enterDelay,
  leaveDelay,
  isHoverHidden,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimeout = useRef<number | null>(null);
  const leaveTimeout = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    if (enterDelay === 0) {
      setIsHover(true);
    } else {
      enterTimeout.current = setTimeout(() => {
        setIsHover(true);
      }, enterDelay);
    }
  };

  const handleMouseLeave = () => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = null;
    }
    if (leaveDelay === 0) {
      setIsHover(false);
    } else {
      leaveTimeout.current = setTimeout(() => {
        setIsHover(false);
      }, leaveDelay);
    }
  };

  const handleMessageMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="container">
      <div className="tooltip-wrap">
        <div
          onMouseLeave={handleMessageMouseLeave}
          ref={tooltipRef}
          className="message"
        >
          <ToolTipPortals
            position={position}
            visible={isHover}
            targetRef={targetRef}
            isHoverHidden={isHoverHidden}
            setIsHover={setIsHover}
          >
            {message}
          </ToolTipPortals>
        </div>
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
