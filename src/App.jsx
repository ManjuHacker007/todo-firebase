import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // realtime fetch
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  // add todo
  const addTodo = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "todos"), {
      text,
      completed: false,
      createdAt: new Date()
    });

    setText("");
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Firebase To-Do</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: 10 }}>
            {todo.text}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 10 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}