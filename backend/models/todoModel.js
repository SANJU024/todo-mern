const db = require("../config/db");

exports.createTodo = (task, userId, callback) => {
    const query = "INSERT INTO tasks (task, isCompleted, user_id) values (?, ?, ?)";
    db.query(query, [task,'pending', userId], callback);
};

exports.getTodos = (userId, callback) => {
    const query = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(query, [userId], callback);
};

exports.updateTodo = (task, id, userId, callback) => {
    const query = "UPDATE tasks SET task = ? WHERE id = ? AND user_id = ?";
    db.query(query, [task, id, userId], callback);
};

exports.deleteTodo = (id, userId, callback) => {
    const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    db.query(query, [id, userId], callback);
};

exports.toggleTodo=(id, userId, isCompleted, callback)=>{
    const query=`
    UPDATE todos 
    SET isCompleted = CASE 
    WHEN isCompleted = 'pending' THEN 'completed' 
    ELSE 'pending'
    END WHERE id = ? AND user_id = ?`
    db.query(query[id,userId],callback);
}
