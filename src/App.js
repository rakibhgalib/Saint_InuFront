import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './screens/login';
import Dashboard from './screens/dashboard';  
import AdminConfigure from './screens/adminConfiguration';
import Projects from './screens/projects';
import Register from './screens/register';
import Dapp from './components/Dapp'
import Readme from './screens/readme';
import Uppass from './screens/uppass';
import CreatenewWallet from './screens/wallet';
import Refund from './screens/refund';
import Donation from './screens/donation';
import Log from './screens/log';
     
function App() {       
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route path='/readme' element={<Readme/>}/> 
        <Route path='/newwallet' element={<CreatenewWallet/>}/> 
        <Route path='/uppass' element={<Uppass/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/adminConfiguration' element={<AdminConfigure/>}/> 
        <Route path='/projects' element={<Projects/>}/> 
        <Route path='/document' element={<Dapp/>}/> 
        <Route path='/refund' element={<Refund/>}/>  
        <Route path='/donation' element={<Donation/>}/>  
        <Route path='/log' element={<Log/>}/>  
      </Routes>
    </Router>
  );
}

export default App;
