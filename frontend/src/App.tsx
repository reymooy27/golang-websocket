import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

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

  const [message, setMessage] = useState("");

  return (
    <div>
      <form className="form">
        <div>
          <input className="input" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button className="btn" onClick={() => socket?.send(message)}>Click</button>
      </form>
      <span>{data}</span>
    </div>
  );
}

export default App;
