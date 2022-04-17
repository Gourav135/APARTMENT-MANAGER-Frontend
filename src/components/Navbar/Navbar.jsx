import Button from '@mui/material/Button';
import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
        <div style={{display: 'flex',justifyContent: 'space-around',backgroundColor:"black",padding: '10px 0px'}}>
            <Button variant="contained"><Link style={{color: 'black',textDecoration:"none"}} to="/">Home</Link></Button>
            <Button variant="contained"><Link style={{color: 'black',textDecoration:"none"}} to="/login">LogIn</Link></Button>
            <Button variant="contained"><Link style={{color: 'black',textDecoration:"none"}} to="/main">Show Flats</Link></Button>
            <Button variant="contained"><Link style={{color: 'black',textDecoration:"none"}} to="/add-flats">Add Flats</Link></Button>
        </div>
    )
}