import React, { useState } from 'react';
import "./login_style.css";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getDocs, collection, where } from "firebase/firestore"
import { db, auth } from '../../config/firebase_config';
import { useNavigate, Link } from "react-router-dom"




function Login(){
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate= useNavigate()

    async function loginFunction(){   
        try{
            const userLogin = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            const user = userLogin.user
            localStorage.setItem("user_uid", user.uid)
            const getLikedPlayListToLocalStorage = await getDocs(collection(db, "playlists"), where("user_uid", "==", user.uid))
            getLikedPlayListToLocalStorage.forEach((playlist)=> localStorage.setItem("fav_playlist_id",playlist.id))
            navigate("/")
        }catch(error){
            const errorCode = error.code;
            if(errorCode === "auth/invalid-email") return alert("Email Inválido")
            if(errorCode === "auth/internal-error") return alert("preencha todos os campos")
            if(errorCode === "auth/wrong-password") return alert("Password inválida")
            console.log("Falha no Login", error.message)
       }; 
     }
    async function resetPasswordFunction(){
        try{
        await sendPasswordResetEmail(auth, loginEmail)
        alert("Check Your Inbox")
        if (loginEmail) setLoginEmail("")
        }catch(error){
            const errorCode = error.code;
            if(errorCode === "auth/network-request-failed") return alert (" Falha no pedido ")
            if (errorCode === "auth/invalid-email") return alert("Email Inválido")
            if(errorCode === "auth/user-not-found") return alert (" Email não encontrado")  
            if (errorCode === "auth/missing-email") return alert("Falta Preencher o Email")

        };
     }

        return (
                <div className="container_login">
                    <div className="login_box">
                        <div className="title">
                            <h1>Login</h1>
                        </div>
                        <div className="username">
                            <input
                                id="email" 
                                type="text" 
                                className="text_input" 
                                placeholder="E-mail"
                                onChange={(e)=>setLoginEmail(e.target.value)}></input>
                        </div>
                        <div className="password">
                            <input 
                                id="user_passowrd"
                                type="password" 
                                className="text_input" 
                                placeholder="Password"
                                onChange={(e)=>setLoginPassword(e.target.value)}></input>
                        </div>
                        <div className="actions">
                            <button className="login_button" onClick={()=>loginFunction()}>Go</button>
                            <button  onClick={()=>resetPasswordFunction()} style={{backgroundColor:"transparent", border: "none"}} className="forgot_password"> Forgot Password?</button>
                            <Link to="/register" className="register_button">Register</Link>
                        </div>
                    </div>
                </div>
          );
}

export default Login