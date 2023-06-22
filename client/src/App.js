import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Accuil from './page/Accuil/Accuil';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import CreateUser from './page/Create_User/CreateUser';
import Autantification from './page/Autantification/Autantification';
import AccuilUser from './page/AccuilUser/AccuilUser';
import Panier from './page/panier/Panier';
import Profil from './page/profil/Profil';
import ModifUser from './page/modifUser/modifUser';
import Search from './page/recherche/Search';

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    <Routes>
      
       {user && <Route path='/:id' exact element={<Accuil/>}></Route>}
       {user && <Route path='/2D/:id' exact element={<AccuilUser/>}></Route>}
       {user && <Route path='/2D/:id/:idp' exact element={<AccuilUser/>}></Route>}
       {user && <Route path='/2D/filter/:id/:categorie' exact element={<AccuilUser/>}></Route>}
       {user && <Route path='/2D/panier/:id' exact element={<Panier/>}></Route>}
       {user && <Route path='/2D/profil/:id/:id1' exact element={<Profil/>}></Route>}
       {user && <Route path='/2D/profil/modif/:id' exact element={<ModifUser/>}></Route>}
       {user && <Route path='/2D/messenger/:id/:ex' exact element={<AccuilUser/>}></Route>}
       {user && <Route path='/2D/search/:id' exact element={<Search/>}></Route>}
       <Route path='/' element={<Accuil/>}></Route>
       <Route path='/inscrition' element={<CreateUser/>}></Route>
       <Route path='/connecter' element={<Autantification/>}></Route>
       <Route path='/connecter/:idp' element={<Autantification/>}></Route>
       <Route path='/connecter/filter/:categorie' element={<Autantification/>}></Route>
       <Route path='/2D/:id' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/:id/:idp' element={<Navigate replace to="/connecter/:idp"/>}></Route>
       <Route path='/2D/panier/:id' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/profil/:id/:id1' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/profil/modif/:id' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/messenger/:id/:ex' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/search/:id' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/:id' element={<Navigate replace to="/connecter"/>}></Route>
       <Route path='/2D/filter/:id/:categorie' element={<Navigate replace to="/connecter"/>}></Route>
    </Routes>
    </>
  );
}

export default App;
