import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function Register(){

    const Navigate = useNavigate();

    const [register, setRegister] = useState({
        name : "",
        email : "",
        password : ""
    });

    function handleChange(e){
        setRegister({...register, [e.target.id] : e.target.value});
    }

    async function registerManager(){
        try{
            let res = await fetch("https://apratment-manager-backend.herokuapp.com/manager/register", {
                method : "POST", 
                body : JSON.stringify(register),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            console.log(res);
            let res_data = await res.json();
            // console.log(res_data);
            if(res_data.status)
            {
                Navigate("/login");
            }
        }catch(error){
            console.log(error);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        registerManager();
    }

    return(
        <div style={{marginTop:"30px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                <TextField sx={{marginBottom:"20px",width:"300px"}} type="text" id="name" value={register.name} onChange={handleChange} label="Enter Name" variant="filled" />
                </div>
                <div>
                <TextField sx={{marginBottom:"20px",width:"300px"}} type="email" id="email" value={register.email} onChange={handleChange}label="Enter Email" variant="filled" />
                </div>
                <div>
                <TextField sx={{marginBottom:"20px",width:"300px"}} type="password" id="password" value={register.password} onChange={handleChange} label="Enter Password" variant="filled" />
                </div>
                <input style={{width:"300px", height:"50px",fontSize:"25px",backgroundColor:"#1976d2",cursor:"pointer"}} type="submit" value="Sign Up" />
            </form>
        </div>
    );
}