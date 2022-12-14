import React, { useState, useEffect, lazy, Suspense } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store";
import AuthContext from "./Contexts/AuthContext";
import {useSelector} from 'react-redux';
import axios from "axios";
import "./App.css";
import { CircularProgress } from "@mui/material";

import Registration from "./page/User/Registration";
// const Registration = lazy(() => import("./page/User/Registration"));
const UserSignin = lazy(() => import("./page/User/UserSignin"));
const Search = lazy(() => import("./page/Searchbar"));
const Task = lazy(() => import("./page/Delivery_boy/Task"));
const Contact = lazy(() => import("./page/Contact"));
const Admin_dashboard = lazy(() => import("./page/AdminPage/Admin_dashboard"));
const Home = lazy(() => import("./page/Searchbar"));
const Menu = lazy(() => import("./page/Menu"));
const OrderView = lazy(() => import("./component/OrderView"));
const AddToFoodlist = lazy(() => import("./component/AddToFoodlist"));
const ForgotPassword = lazy(() => import("./component/ForgotPassword"));

const Cart = lazy ( () => import('./component/Cart'))
// const Message =lazy( () => import('./component/Message'))
const ContactWizAdmin = lazy(() =>
  import("./page/Delivery_boy/ContactWizAdmin")
);

function App() {
  const [user, setUser] = useState({});
  const [waiting, setWating] = useState(false);
  const [isLoggedIn, setLog] = useState(false);

  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const auth = async () => {
      if (!cookies.token) {
        return;
      }
      await axios
        .get("https://mernfood-delivery.onrender.com/api/auth/" + cookies.token)
        .then((data) => {
          setLog(true);
          setUser(data.data);
          setWating(false);
          // console.log(data.data)
        });
    };
    auth();
  }, []);

  const cartItem = useSelector((state) => state.cart.itemList)
  console.log(cartItem);
  
  return waiting ? (
    <>you fucking idiot. fix it!</>
  ) : (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedIn, setLog, setCookie }}
    >
  
        <Suspense fallback={<CircularProgress className="circularProgress" />}>
          <Routes>
            {!isLoggedIn ? (
              <Route path="/Register" element={<Registration />} />
            ) : (
              <></>
            )}

            {!isLoggedIn ? <Route path="/" element={<UserSignin />} /> : <></>}
            {!isLoggedIn ? (
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
            ) : (
              <></>
            )}

            {isLoggedIn ? (
              <Route path="/searchbar" element={<Home />} />
            ) : (
              <></>
            )}
            {isLoggedIn ? <Route path="/" element={<Search />} /> : <></>}
            {isLoggedIn ? <Route path="/Menu" element={<Menu />} /> : <></>}
            {isLoggedIn ? (
              <Route path="/Admin_dashboard" element={<Admin_dashboard />} />
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Route path="/Contact" element={<Contact />} />
            ) : (
              <></>
            )}
              {isLoggedIn ? (
              <Route path="/Cart" element={<Cart />} />
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Route path="/AddToFoodlist" element={<AddToFoodlist />} />
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Route path="/OrderView" element={<OrderView />} />
            ) : (
              <></>
            )}
            {isLoggedIn ? <Route path="/Task" element={<Task />} /> : <></>}
            {isLoggedIn ? (
              <Route path="/report" element={<ContactWizAdmin />} />
            ) : (
              <></>
            )}
          </Routes>
        </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
