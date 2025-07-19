const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// Register
exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: "Error hashing password" });
            }
            const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({ message: "Email already exists" });
                    }
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
                res.status(201).json({ message: "User registered successfully" });
            });
        });
    }catch(err){
        res.status.json({msg:"Server Error",err});
    }
}

// Login
exports.userLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Credentials required" });
    }

    try{

        const sqlLogin = "SELECT * FROM users WHERE email = ?";
        db.query(sqlLogin, [email], (err, results) => {
            if (err) return res.status(500).json({ message: "Database error" });
            if (results.length === 0) return res.status(400).json({ message: "User not found" });
            
            const user = results[0];
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).json({ message: "Error comparing password" });
                if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
                
                const token = jwt.sign(
                    { id: user.id, email: user.email, name: user.name },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                
                res.json({ message: "Login successful", token });
            });
        });
    }catch(error){
        res.status(500).json({msg:"Server Error:",error})
    }
}