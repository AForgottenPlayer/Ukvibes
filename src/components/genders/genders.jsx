import React, { useState } from 'react';
import "./gender_style.css";
import { useEffect } from 'react';
import { db } from '../../config/firebase_config';
import { getDocs, collection, query, where } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'




function Genders (){
   
    const navigate = useNavigate();
    const [generos, setGeneros]= useState([])
    
    useEffect (()=>{
        getGeneros()
    }, [])

    async function getGeneros(){
        const generos = await getDocs(collection(db, "generos"))
        const generosList=[]
        generos.forEach((doc) => {
            generosList.push({...doc.data(), id: doc.id});
          });
        setGeneros(generosList)
    }
        return (
            <>
                <div className="grid">
                    {generos.map((genero, index)=>(
                        <div key={index}className="single_genero" onClick={()=>navigate("/gender/"+genero.id)}>
                            <h3>{genero.genero_nome.toUpperCase()}</h3>
                        </div>
                    ))}
                </div>
            </>
          );
    
}

export default Genders