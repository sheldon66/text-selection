import "./App.css";
import useHighligntRange from "@/hooks/useHighlightRange";
function App() {
  const [, highlightRange] = useHighligntRange();
  return (
    <div className="App">
      <p id="foo">
        hello world hah<a>ahsdfs</a>ahahsdfsdf <span>sdfsdf</span>
      </p>
      <p>
        hello todal <span>ysdf</span>sdf<i>斜体</i> <span>sdf</span> sdf
        <title>sdfsdf</title>
      </p>
      <button onClick={highlightRange}>高亮</button>
    </div>
  );
}

export default App;
