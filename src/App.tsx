import "./App.scss";
import { ToolTip } from "./components/ToolTip/ToolTip";

function App() {
  return (
    <>
      <div className="section">
        <ToolTip>
          <button className="button">TL</button>
        </ToolTip>
      </div>
    </>
  );
}

export default App;
