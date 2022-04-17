// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";

import Register from './components/register/Register';
import Login from './components/login/Login';
import Main from './components/main/Main';
import {Navbar} from './components/Navbar/Navbar';
import {AddFlats} from './components/AddFlats/AddFlats';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        < Route path="/" element={<Register />} /> 
        < Route path="/login" element={<Login />} />
        < Route path="/main" element={<Main />} />
        < Route path="/add-flats" element={<AddFlats />} />
      </Routes>
    </div>
  );
}

export default App;
