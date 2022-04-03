import React, { useState } from 'react';
import "./header_style.css";
import $ from "jquery";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../config/firebase_config';
import { Link } from "react-router-dom"


function Header(){


     function handleSideBar(){    
        if($(".nav-links").attr("toggle")==0){
            $(".header").css({"position":"fixed"});
            $(".nav-links").animate({"right": "0px"});
            $(".nav-links").attr("toggle","1");
        }else{
            $(".nav-links").animate({"right": "-800px"});
            $(".nav-links").attr("toggle","0");
            $(".header").css({"position":"fixed"});
        }
    }

    const [isLoggedIn, setLoggedIn] = useState(false); // vai representar o user que está logado
    onAuthStateChanged(auth,( currentUser) =>{
        if(currentUser) setLoggedIn(true) 
        if(!currentUser) setLoggedIn(false)
    })


    function logout(){
        localStorage.removeItem('user_uid')
        signOut(auth)
    }

        return (
                <div className="main_header">
                <header className="header">
                <Link to="/"><h1 className="logo_text">UkVibes</h1></Link>  
                        <ul className="nav-links" toggle="0">
                            <li className="links">
                                <Link className="link" to="/">Home</Link>
                            </li>
                            <li className="links">
                                <Link className="link" to="/genders">Genres</Link>
                            </li>
                            <li className="links">
                                <Link className="link" to="/artists">Artists</Link>
                            </li>
                           
                         {isLoggedIn ? 

                             <li className="links">
                                <Link className="link" to="/playlist">Playlist</Link>
                                 </li> 
                                 :null //mostra
                                }
                            <li className="links">
                                <Link className="link" to="/about-us">About Us</Link>
                            </li>
                            {isLoggedIn?null:
                            //esconde o login
                            <li className="links">
                                <Link className="link" to="/login">Login</Link>
                            </li>
                                }                 
                            {isLoggedIn?

                            <li className="links">
                                <Link className='link 'to='/' onClick={logout}>Sign Out</Link>
                            </li> 
                            :null }
                            
                       </ul>
                       <div className="hamburger" onClick={()=>handleSideBar()}>
                           <div className="lines"></div>
                           <div className="lines"></div>
                           <div className="lines"></div>
                           
                       </div>     
                </header>
                </div>

          );
    }

export default Header