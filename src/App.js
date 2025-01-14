import React, { useState, useEffect, lazy, Suspense, createContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase_config"
import "./components/genders/gender_style.css";
import PlayerContext from "./components/playerContext"
import Header from "./components/header/header";
import Loader from "./components/loader"
import "./components/header/header_style.css"
import "./App.css"
// Atualiza cada componente 
const Home_bo = lazy(() => import("./backoffice/home_bo"))
const Login_bo = lazy(()=>import("./backoffice/login_bo"))
const Home = lazy(()=>import("./components/home/home"))
const Contact = lazy(()=>import("./components/contact/contact"))
const Login = lazy (()=>import("./components/login/login"))
const Genders = lazy(()=>import("./components/genders/genders"))
const Register = lazy(()=>import("./components/register/register"))
const Gender = lazy(()=>import("./components/genders/gender"))
const Artists = lazy(()=>import("./components/artists/artists"))
const Artist = lazy (()=>import("./components/artists/artist"))
const Playlist = lazy(()=>import("./components/playlist/playlist"))
const UserPlaylist = lazy(()=>import("./components/playlist/userPlaylist"))


export const ThemeContext = createContext(null)


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)
  


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  },[])


  return (
    <Router>
     
      <Header/> 
      <PlayerContext>
        <Suspense fallback={<Loader/>}>
          <Routes>
            
              <Route path='/login_bo' element={<Login_bo/>} />
              <Route path='/home_bo' element={<Home_bo/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/genders" element={<Genders/>} />
              <Route path="/gender/:id" element={<Gender/>} />
              <Route path="/artists" element={<Artists/>} />
              <Route path="/artista/:id" element={<Artist/>} />
              {isLoggedIn && <Route path="/playlist" element={<Playlist/>} />}
              {isLoggedIn && <Route path="/userPlaylist/:id" element={<UserPlaylist/>}/>}
              <Route path="/about-us" element={<Contact/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/" exact element={<Home/>} />
              <Route path="*" element={<Navigate to="/"/>}/>
          </Routes> 
        </Suspense>
      </PlayerContext>
      
   </Router>
  );
  
} 

export default App;
 