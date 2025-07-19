import axios from "axios";
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom";
function Register(){
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [name, setName] =useState("")
    const [msg, setMsg] =useState("")
    const [showPassword, setShowPassword]= useState(false);
    const navigate=useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/api/auth/register",{name,email,password});
            setMsg("Register successful");
            navigate("/");
        }catch(err){
            setMsg(err.response?.data?.msg||"Registration failed.");
        }
    }
    return (
        <div>
            <form  onSubmit={handleRegister}>
                <h2>Register</h2>
                <input type="text"
                    required
                    value={name}
                    placeholder="Full Name"
                    onChange={(e)=>{setName(e.target.value)}}
                 />
                 <input type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <div>
                    <input type={showPassword?"text":"password"}
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <span onClick={()=>{setShowPassword(!showPassword)}}>{showPassword?"hide":"show"}</span>
                </div>
                <button type="submit">Register</button>
                <p>Already have an account <Link to="/login">Login</Link></p>
                {msg&&<p>{msg}</p>}
            </form>
        </div>
    )
}
export default Register;