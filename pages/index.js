import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const postHandler = async () => {
    const res = await fetch("api/data", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <h1>DB</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={postHandler}>send</button>
    </>
  );
}
