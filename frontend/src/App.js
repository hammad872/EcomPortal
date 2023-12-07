import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import { LoginForm } from './components/LoginForm';
import {SignupForm} from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/home" element={<Home/>}/>
        
      </Routes>
      <Navbar />
    </BrowserRouter>
    

    </>
  );
}

export default App;
