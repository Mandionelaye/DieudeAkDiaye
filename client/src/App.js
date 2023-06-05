import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Accuil from './page/Accuil/Accuil';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import CreateUser from './page/Create_User/CreateUser';
import Autantification from './page/Autantification/Autantification';
import AccuilUser from './page/AccuilUser/AccuilUser';
function App() {
   const user = localStorage.getItem("token");
  return (
    <>
    <Routes>
       <Route path='/' element={<Accuil/>}></Route>
       {user && <Route path='/2D/:id' exact element={<AccuilUser/>}></Route>}
       <Route path='/inscrition' element={<CreateUser/>}></Route>
       <Route path='/connecter' element={<Autantification/>}></Route>
       <Route path='/2D/:id' element={<Navigate replace to="/connecter"/>}></Route>
    </Routes>
    </>
  );
}

export default App;
