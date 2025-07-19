import { useEffect, useState } from "react";
import Greet from "../components/Greet";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const navigate=useNavigate();

    const fetchTodos = async () => {
        try {
            const res = await axios("http://localhost:5000/api/todo/todolist", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setTodos(res.data);
        } catch (err) {
            console.error("Failed to fetch todos", err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login")
    }

    return (
        <div>
            <Greet handleLogout={handleLogout}/>
            <CreateTodo task={task} setTask={setTask} fetchTodos={fetchTodos} />
            {todos.map((todo) => (
                <TodoList
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    isCompleted={todo.isCompleted}
                    fetchTodos={fetchTodos}
                />
            ))}
        </div>
    );
}

export default Home;
