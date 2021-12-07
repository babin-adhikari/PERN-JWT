import './App.css';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// components

import Dashboard from './component/Dashboard';
import Register from './component/Register';
import Login from './component/Login';

toast.configure();

function App() {

  const [authentication, setAuthentication] = useState(false);

  const setAuth = (boolean) => {
    setAuthentication(boolean)
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();

      parseRes === true ? setAuthentication(true) : setAuthentication(false);


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={!authentication?<Login setAuth={setAuth}/>: <Navigate to="/dashboard"/>}/>
        <Route exact path="/register" element={!authentication?<Register setAuth={setAuth}/>: <Navigate to="/login"/>}/>
        <Route exact path="/dashboard" element={authentication?<Dashboard setAuth={setAuth}/>: <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
