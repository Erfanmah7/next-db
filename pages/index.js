import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState("");
  const [email, setEmail] = useState("");

  function updateData() {
    fetch("api/data")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }

  useEffect(() => {
    updateData();
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

  const detailsHandler = (id) => {
    fetch(`api/data/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  };

  const editHandler = (user) => {
    setEdit(user._id);
    setEmail(user.email);
  };

  const saveHandler = async (id) => {
    const res = await fetch(`api/data/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setEdit("");
    console.log(data);
  };

  const deleteHandler = async (id) => {
    const res = await fetch(`api/data/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    updateData();
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
            <li key={user._id}>
              <h3>{user.name}</h3>
              <button onClick={() => detailsHandler(user._id)}>
                Log details
              </button>
              <button onClick={() => editHandler(user)}>Edit</button>
              <button onClick={() => deleteHandler(user._id)}>Delete</button>
              {edit && edit === user._id ? (
                <div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={() => saveHandler(user._id)}>Save</button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
