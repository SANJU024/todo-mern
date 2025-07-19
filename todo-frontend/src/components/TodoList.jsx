import axios from "axios";

function TodoList(props) {
    const { id, task, fetchTodos } = props;

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchTodos(); // ✅ refresh after delete
        } catch (err) {
            console.error("Error deleting Todo", err);
        }
    }

    async function handleUpdate() {
        const newTask = prompt("Edit your task:", task);
        if (!newTask || newTask === task) return;
        try {
            await axios.put(
                `http://localhost:5000/api/todo/update/${id}`,
                { task: newTask },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            fetchTodos(); // ✅ refresh after update
        } catch (err) {
            console.error("Error updating Todo", err);
        }
    }


    return (
        <div>
            <p>
                {task}
            </p>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TodoList;
