import React, { useState, useRef } from 'react';
import "./register_styles.css";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { db } from '../../config/firebase_config';
import {addDoc, collection} from "firebase/firestore";
import { Link } from 'react-router-dom';

function Register(){
    

    const auth = getAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const secondInputRef = useRef()
    
    async function registerFunction (e){
        
        try{
            const createUser = await createUserWithEmailAndPassword(auth, email, password)
            try{
                const createLike =await addDoc(collection(db, 'playlists'),{
                    user_uid: createUser.user.uid,
                    playlist_nome: "Favoritos"
                })    
                localStorage.setItem("fav_playlist_id",createLike.id)
                localStorage.setItem("user_uid", createUser.user.uid)
            }catch(e){
                e && console.log(e)
            }
        }catch(error){
            const errorCode = error.code;
            
            if(errorCode === "auth/invalid-email" )  return alert("Email Inválido")
            if(errorCode === "auth/internal-error" ) return alert ("preencha todos os campos")
            if(errorCode === "auth/weak-password")   return alert (" A Password deve ter pelo menos 6 caracteres")
            if(errorCode === "auth/email-already-in-use") return alert ("Email já registado") 
            if(errorCode === "auth/user-not-found")  return alert ("Email não encontrado")
        } 
    }
    

        return (
                <form className="container_register">
                    <div className="register_box">
                        <div className="title">
                            <h1>Register</h1>
                        </div>
                        {/*<div class="name">
                            <input 
                                id="username"
                                type="text" 
                                class="text_input" 
                                placeholder="Name"
                                onChange={(e)=>setUserName(e.target.value)}
                                >
                            </input>
                        </div>*/}
                        <div className="email">
                            <input 
                                id="email"
                                type="text" 
                                className="text_input" 
                                placeholder="E-mail"
                                onKeyDown={(e)=>{e.key==="Enter" && secondInputRef.current.focus()}}
                                onChange={(e) => setEmail(e.target.value)}
                                >  
                            </input>
                        </div>
                        <div className="password">
                            <input
                                ref={secondInputRef}
                                id="password" 
                                type="password" 
                                className="text_input" 
                                placeholder="Password"
                                onKeyDown={(e)=>{e.key==="Enter" && registerFunction()}}
                                onChange={(e) => setPassword(e.target.value)}
                                ></input>
                        </div>
                        <div className="actions">
                            <Link to="/"><button className="login_button" onClick={() => registerFunction()}>Register</button></Link>
                            <Link to="/" className="register_button">Login</Link>
                        </div>
                        

                    </div>
                    
                </form>
          );
        }

export default Register