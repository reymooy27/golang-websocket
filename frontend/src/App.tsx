import { FormEvent, useEffect, useState } from "react";

type Data = {
  message: string;
  status: string;
  timestamp: Date;
};

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  console.log(data);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onopen = (event) => {
      console.log(event.type);
    };

    ws.onmessage = (event) => {
      setData((prev) => [...prev, JSON.parse(event.data)]);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.send(
      JSON.stringify({
        message,
        status: "success",
        timestamp: Date.now(),
      }),
    );
    setMessage("");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Enter message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button disabled={message === ""} className="btn">
          Send Message
        </button>
      </form>
      <div>
        {data
          .sort(
            (a, b) =>
              parseInt(b.timestamp.toString()) -
              parseInt(a.timestamp.toString()),
          )
          .map((item) => (
            <div key={JSON.stringify(item.timestamp)}>
              <h5>{item.message}</h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
