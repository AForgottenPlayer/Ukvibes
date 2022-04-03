import React, { useState, useEffect } from 'react';
import "./artists_styles.css";  
import { db } from '../../config/firebase_config';
import { getDocs, collection } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import Loader from '../loader';




function Artists(){

    const navigate = useNavigate()
    const [artists, setArtists]= useState([])
    const [ isLoading, setLoading]= useState(true)

    useEffect(()=>{
        getArtistas()
        return null
    },[])

    async function getArtistas(){
        const artistas = await getDocs(collection(db, "artistas"))
        const artistasList=[]
        artistas.forEach((doc) => {
            artistasList.push({...doc.data(), id: doc.id});
          });
        setArtists(artistasList)
        setLoading(false)
    }
     

        return isLoading?<Loader/>:
                <div className="grid_artists">
                    {artists.map((artista, index)=>(
                        <div key={index} className="single_artist" onClick={()=>navigate("/artista/"+artista.id)} >
                            <img src={artista.image_url} alt="" className="image"></img>
                            <h3 className="artist-name">{artista.artista_nome}</h3>
                         </div>
                    ))}
                </div>
    }


export default Artists 