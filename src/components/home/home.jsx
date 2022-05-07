import React, { useState} from 'react';       
import "./home_style.css";
import { Link } from 'react-router-dom';
import image from "./HM.jpg"
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Home(){
  const auth = getAuth();
  const [showLogin, setShowLogin] = useState(false);
    onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser) setShowLogin(true)
      if(!currentUser) setShowLogin(false)
    })  
  
  return (
    <>
     <div className='home' style={{backgroundImage: `url(${image})`}}>
      <div className='headerContainer'>
        <h1 > UkVibes Awaits You </h1>
     
      {showLogin? "": <>  
        <Link to="/login">
          <h2>Sign Up For The Features</h2>
        </Link>  
      </>}
      </div>
    </div>
    </>
)}

export default Home  

