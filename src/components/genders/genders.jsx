import React, { useState } from 'react';
import "./gender_style.css";
import { useEffect } from 'react';
import { db } from '../../config/firebase_config';
import { getDocs, collection } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import Loader from '../loader';




function Genders (){
   
    const navigate = useNavigate();
    const [generos, setGeneros]= useState([])
    const [ isLoading, setLoading]= useState(true)

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
        setLoading(false)
    }
        return (
            <>
                <div className="grid">
                    {isLoading ? <Loader/>:
                    (generos.map((genero, index)=>(
                        <div key={index}className="single_genero" onClick={()=>navigate("/gender/"+genero.id)}>
                            <h3>{genero.genero_nome.toUpperCase()}</h3>
                        </div>
                    )))}
                </div>
            </>
          );
    
}

export default Genders