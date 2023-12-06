import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import { LoginForm } from './components/LoginForm';
import {SignupForm} from './components/SignupForm';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
      </Routes>
    </BrowserRouter>
    

    </>
  );
}

export default App;
