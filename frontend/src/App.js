import React, { useEffect } from "react";
import logo from './logo.svg';
import Trustise from './components/Trustise';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser, login, logout} from './feature/userSlice'
import Login from "./components/auth/Login"
import { auth } from "./firebase";
import {onAuthStateChanged} from 'firebase/auth'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, (authUser)=>{
      if(authUser) {
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid
        })
        );
        console.log("AuthUser", authUser)
      }
    });
  }, [dispatch]);
  return (
    // <div className="App">
<h1>
      {user ? <Trustise /> : <Login />}
    {/* <Trustise /> */}
    </h1>
    // </div>
  );
}

export default App;
