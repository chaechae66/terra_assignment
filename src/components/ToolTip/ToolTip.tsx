import { ReactNode, useState } from "react";
import "./Tooltip.scss";

interface Props {
  children: ReactNode;
}

export function ToolTip({ children }: Props) {
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
        <div className={`message ${isHover ? "active" : ""}`}>
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
