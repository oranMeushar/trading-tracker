import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/Dashboard';
import Logs from './pages/logs/Logs';
import Reports from './pages/reports/Reports';
import Stats from './pages/stats/Stats';
import Register from './pages/register/register';
import Navigation from './components/navigation/Navigation';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLogin } from './store/services/usersReducer';
import PrivateRoute from './hocs/privateRoute/privateRoute';
import TradeDetails from './pages/tradeDetails/TradeDetails';
//comment
const App =  () => {

  const dispatch = useDispatch();

  const isAuth = () =>{
    let user = localStorage.getItem('user');
    let decoded = null;


    if(user){
      user = JSON.parse(user);
      const {token, email, name, _id} = user;
      try{
        decoded = jwt_decode(token);
      }
      catch (e){
        console.log(e);
      }

      if (decoded && decoded.exp > (Date.now() / 1000) ) {
        dispatch(setLogin({email, name, token, _id})); 
      }
    }
  }
  
  isAuth();

  


  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route exact path='/' element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
        <Route exact path='/logs' element={<PrivateRoute> <Logs/> </PrivateRoute> }/>
        {/* <Route exact path='/reports' element={ <PrivateRoute> <Reports/> </PrivateRoute>}/> */}
        <Route exact path='/stats' element={<PrivateRoute> <Stats/> </PrivateRoute>  }/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/logs/:id' element={<PrivateRoute> <TradeDetails/> </PrivateRoute> }/>
    </Routes>
    </>
  );
};

export default App;