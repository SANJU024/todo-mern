import { useState } from "react";
import axios from "axios";

function CreateTodo({ task, setTask, fetchTodos }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        try {
            setLoading(true);
            await axios.post(
                "http://localhost:5000/api/todo/create",
                { task },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setTask("");
            fetchTodos(); // ✅ Refresh todo list after adding
        } catch (err) {
            console.error("Error creating todo", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter your todo"
            />
            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Todo"}
            </button>
        </form>
    );
}

export default CreateTodo;
