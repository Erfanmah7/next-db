import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("api/data")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

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
      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
