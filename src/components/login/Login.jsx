import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function Login(){

    const Navigate = useNavigate();

    const [login, setLogin] = useState({
        email : "", 
        password : ""
    });

    function handleChange(e){
        setLogin({...login, [e.target.id] : e.target.value});
    }

    async function loginUser(){
        try{
            let res = await fetch("https://apratment-manager-backend.herokuapp.com/manager/login", 
            {
                method : "POST", 
                body : JSON.stringify(login),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let res_data = await res.json();
            // console.log(res_data);
            if(res_data.status){
                Navigate("/main");
            }

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div style={{marginTop:"30px"}}>
            <form onSubmit={(e)=>{
                e.preventDefault();
                loginUser();
            }}>
                <div>
                <TextField sx={{marginBottom:"20px",width:"300px"}} type="email" id="email" value={login.email} onChange={handleChange}  label="Enter Email" variant="filled" />
                </div>
                <div>
                <TextField sx={{marginBottom:"20px",width:"300px"}} type="password" id="password" value={login.password} onChange={handleChange} label="Enter Password" variant="filled" />
                </div>
                <input style={{width:"300px", height:"50px",fontSize:"25px",backgroundColor:"#1976d2",cursor:"pointer"}} type="submit" value="Log In" />
            </form>
        </div>
    );
}