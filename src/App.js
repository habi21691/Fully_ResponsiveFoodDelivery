import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { Route, Routes } from "react-router-dom";
import Home from "./page/Searchbar";
import Menu from './page/Menu';
import Search from './page/Searchbar'
import Admin_dashboard from './page/AdminPage/Admin_dashboard';
import Contact from './page/Contact'
import Registration from './page/User/Registration';
import UserSignin from './page/User/UserSignin'
import AuthContext from './Contexts/AuthContext'
import AddToFoodlist from './component/AddToFoodlist';
import OrderView from './component/OrderView';
import Order_receving from './page/Delivery_boy/Order_receving'
import Task from './page/Delivery_boy/Task'
import EmailSend from './component/EmailSend';
import axios from 'axios';
import './App.css';

function App() {

  const [user, setUser] = useState({});
  const [waiting, setWating] = useState(false);
  const [isLoggedIn, setLog] = useState(false);

  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => { 
    const auth = async () => {
      if(!cookies.token){
        return;
      }
      await axios.get('http://localhost:5000/api/auth/' + cookies.token).then((data) => {
        setLog(true)
        setUser(data.data)
        setWating(false)
        // console.log(data.data)
      })
    }
     auth();
     

  }, [])

  return waiting ? <>you fucking idiot. fix it!</> : (
   

    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setLog, setCookie }}>
      <Routes>

        {!isLoggedIn ? (<Route path='/Register' element={<Registration />} />) : (<></>)}

        {!isLoggedIn ? (<Route path='/' element={<UserSignin/>} />) : (<></>)}
        {!isLoggedIn ? (<Route path='/EmailSend' element={<EmailSend/>} />) :(<></>)}



        {isLoggedIn ? (<Route path='/searchbar' element={<Home />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/' element={<Search/>} />) : (<></>)}
        {isLoggedIn ? (<Route path='/Menu' element={<Menu />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/Admin_dashboard' element={<Admin_dashboard />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/Contact' element={<Contact />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/AddToFoodlist' element={<AddToFoodlist />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/OrderView' element={<OrderView />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/Order_receving' element={<Order_receving />} />) : (<></>)}
        {isLoggedIn ? (<Route path='/Task' element={<Task/>} />) : (<></>)}


      </Routes>
    </AuthContext.Provider>
  

  );
}

export default App;
