import {jwtDecode}  from "jwt-decode";
function Greet({handleLogout}){

    const token=localStorage.getItem("token");
    let user ="";
    if(token){
        const decoded =jwtDecode(token);
        user=decoded.name;
    }
    
    return(
        <div>
            <p>Welcome, {user} </p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Greet;