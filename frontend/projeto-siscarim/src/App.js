import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './login/Login';
import Menu from './menu/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/menu' element={<Menu/>}></Route>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
