import { useState } from "react"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";
function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [msg,setMsg]=useState("");
    const [showPassword, setShowPassword]= useState(false);
    const navigate=useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const res= await axios.post("http://localhost:5000/api/auth/login",{email,password});

            localStorage.setItem("token", res.data.token);
            setMsg("Login successfull");
            navigate("/");

        }catch(err){
            setMsg(err.response?.data?.msg|| "login failed");
        }
    };
    return(
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <p>Don't have an account <Link to="/register" >Register</Link></p>
                {msg&&<p>{msg}</p>}
            </form>
        </div>
    )
}

export default Login;