
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Resetpassword from './Components/Resetpassword';
import Bookticket from './Components/Bookticket';
import Viewticket from './Components/Viewticket';

function App() {
  return (
  <BrowserRouter>
      <div className="App">
      <Routes>
        
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/resetpass' element={<Resetpassword/>}/>
        <Route path='/ticketbook' element={<Bookticket/>}/>
        <Route path='/viewticket' element={<Viewticket/>}/>
    
      </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
