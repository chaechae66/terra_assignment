import "./App.scss";
import { ToolTip } from "./components/ToolTip/ToolTip";

function App() {
  return (
    <>
      <section className="tooltip-section">
        <div className="section">
          <div className="top-section">
            <ToolTip position={"TL"}>
              <button className="button">TL</button>
            </ToolTip>
            <ToolTip position={"T"}>
              <button className="button">Top</button>
            </ToolTip>
            <ToolTip position={"TR"}>
              <button className="button">TR</button>
            </ToolTip>
          </div>
          <div className="vertical-section">
            <div className="left-section">
              <ToolTip position={"LT"}>
                <button className="button">LT</button>
              </ToolTip>
              <ToolTip position={"L"}>
                <button className="button">Left</button>
              </ToolTip>
              <ToolTip position={"LB"}>
                <button className="button">LB</button>
              </ToolTip>
            </div>
            <div className="right-section">
              <ToolTip position={"RT"}>
                <button className="button">RT</button>
              </ToolTip>
              <ToolTip position={"R"}>
                <button className="button">Right</button>
              </ToolTip>
              <ToolTip position={"RB"}>
                <button className="button">RB</button>
              </ToolTip>
            </div>
          </div>
          <div className="bottom-section">
            <ToolTip position={"BL"}>
              <button className="button">BL</button>
            </ToolTip>
            <ToolTip position={"B"}>
              <button className="button">Bottom</button>
            </ToolTip>
            <ToolTip position={"BR"}>
              <button className="button">BR</button>
            </ToolTip>
          </div>
        </div>
        <div className="overflow-section">
          <div className="top-section">
            <ToolTip position={"TL"}>
              <button className="button">TL</button>
            </ToolTip>
            <ToolTip position={"T"}>
              <button className="button">Top</button>
            </ToolTip>
            <ToolTip position={"TR"}>
              <button className="button">TR</button>
            </ToolTip>
          </div>
          <div className="vertical-section">
            <div className="left-section">
              <ToolTip position={"LT"}>
                <button className="button">LT</button>
              </ToolTip>
              <ToolTip position={"L"}>
                <button className="button">Left</button>
              </ToolTip>
              <ToolTip position={"LB"}>
                <button className="button">LB</button>
              </ToolTip>
            </div>
            <div className="right-section">
              <ToolTip position={"RT"}>
                <button className="button">RT</button>
              </ToolTip>
              <ToolTip position={"R"}>
                <button className="button">Right</button>
              </ToolTip>
              <ToolTip position={"RB"}>
                <button className="button">RB</button>
              </ToolTip>
            </div>
          </div>
          <div className="bottom-section">
            <ToolTip position={"BL"}>
              <button className="button">BL</button>
            </ToolTip>
            <ToolTip position={"B"}>
              <button className="button">Bottom</button>
            </ToolTip>
            <ToolTip position={"BR"}>
              <button className="button">BR</button>
            </ToolTip>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
