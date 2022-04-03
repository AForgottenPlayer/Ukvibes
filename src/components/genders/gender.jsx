import React, { useState, useEffect } from 'react';
import "./gender_style.css";
import { db } from '../../config/firebase_config';
import { doc, getDoc, getDocs, collection, where, query } from "firebase/firestore"
import { useParams } from "react-router-dom";
import SingleMusica from './single-musica';

function Gender(){
    
    const [genero, setGenero]= useState(false)
    const [musicas, setMusicas] = useState([])
    const params= useParams()
    
    useEffect(()=> {     
        getMusicas()
        getGenero()
        return null
    },[])
    
    async function getMusicas(){ 
        const getMusicas = await getDocs(query(collection(db, "musicas"), where("genero_id", "==", params.id)))
        getMusicas.forEach(async(docs) => {
            const getArtistName = await getDoc(doc(db, "artistas",docs.data().artista_id))
            const checkFavorites = await getDoc(doc(db, "playlists", localStorage.getItem('fav_playlist_id')))
            if(!checkFavorites.data().musicas) return              setMusicas(musicas=>[...musicas,{...docs.data(), id: docs.id, artista_nome: getArtistName.data().artista_nome}])
            if(checkFavorites.data().musicas.includes(docs.id)){
                setMusicas(musicas=>[...musicas,{...docs.data(), id: docs.id, artista_nome: getArtistName.data().artista_nome, isFavorite: true, genderPage: true}])  
            }else{
                setMusicas(musicas=>[...musicas,{...docs.data(), id: docs.id, artista_nome: getArtistName.data().artista_nome, genderPage: true}]) 
            } 
        })            
    }  

    async function getGenero(){
        const getGen = await getDoc(doc(db, "generos", params.id))
        setGenero(getGen.data().genero_nome)
    }

        return (
            <>
                <div className="gender_title">
                    <h2 className='middle' onClick={()=>console.log(musicas)}>{genero && genero}</h2>
                </div>
                <div className="musics">
                    {musicas && musicas.map((musica, index)=>(
                        <SingleMusica key={index} musica={musica}/>
                    ))} 
                </div> 
            </>
          );
        }                 

export default Gender