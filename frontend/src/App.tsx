import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string>("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  //
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = (event) => {
      console.log(event.type);
    };

    ws.onmessage = (event) => {
      setData(event.data);
      console.log("msg: ", event.data);
    };

    ws.onclose = (event) => {
      console.log(event.type);
    };

    ws.onerror = (event) => {
      console.log(event.type);
    };

    if (buttonRef != null) {
      buttonRef?.current.addEventListener("click", () => {
        ws.send("hello");
      });
    }
  }, []);

  return (
    <div>
      <span>{data}</span>
      <button ref={buttonRef}>Click</button>
    </div>
  );
}

export default App;
