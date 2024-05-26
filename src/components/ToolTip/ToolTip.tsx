import { ReactNode, useState } from "react";
import "./Tooltip.scss";

interface Props {
  children: ReactNode;
  position?:
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
    | "BR"
    | null;
}

export function ToolTip({ position, children }: Props) {
  const [isHover, setIstHover] = useState(false);
  const handleMouseEnter = () => {
    setIstHover(true);
  };

  const handleMouseLeave = () => {
    setIstHover(false);
  };
  return (
    <div className="container">
      <div className="tooltip-wrap">
        <div
          className={`message ${isHover ? "active" : ""} ${
            position ? position : "TL"
          }`}
        >
          Prompt Text
          <br />
          Prompt Text
          <br />
          Prompt Text{" "}
        </div>
        <div
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
