import {useState} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';

export const AddFlats = () => {

    const [formData, setFormData] = useState({
        flat_type:"",
        block:"",
        flat_no:"",
        residents_count:""
    })

    const handleChange=(e)=>{
        const {id,value} = e.target;
        setFormData({
          ...formData,
          [id]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post("https://apratment-manager-backend.herokuapp.com/flats",formData).then(() => {
            setFormData({
                flat_type:"",
                block:"",
                flat_no:"",
                residents_count:""
            })
        })
    }
    return (
        <div style={{marginTop:"30px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField sx={{marginBottom:"20px",width:"300px"}} value={formData.flat_type} id="flat_type" type="text" onChange={handleChange} label="Flat Type" variant="filled" />
                </div>
                <div>
                    <TextField sx={{marginBottom:"20px",width:"300px"}} value={formData.block} id="block" type="text" onChange={handleChange} label="Block" variant="filled" />
                </div>
                <div>
                    <TextField sx={{marginBottom:"20px",width:"300px"}}  value={formData.flat_no} id="flat_no" type="text" onChange={handleChange} label="Flat Number" variant="filled" />
                </div>
                <div>
                    <TextField sx={{marginBottom:"20px",width:"300px"}} value={formData.residents_count} id="residents_count" type="Number" onChange={handleChange} label="Residents Count" variant="filled" />
                </div>
                <input style={{width:"300px", height:"50px",fontSize:"25px",backgroundColor:"#1976d2",cursor:"pointer"}} type="Submit" />
            </form>
        </div>
    )
}