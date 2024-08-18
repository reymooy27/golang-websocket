import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  //
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

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

    return () => ws.close();
  }, []);

  return (
    <div>
      <span>{data}</span>
      <button onClick={() => socket?.send("hello")}>Click</button>
    </div>
  );
}

export default App;
