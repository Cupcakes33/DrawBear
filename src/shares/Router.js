
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "../pages/Signup";
import Login from '../pages/Login'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
              <Route path='/' element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;