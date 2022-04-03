import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase_config'
import { doc, getDoc } from "firebase/firestore"
import "./artists_styles.css";  
import Loader from '../loader';


function Artist() {

  const [artist, setArtist] = useState([])
  const [isLoading, setLoading]= useState(true)

  
  const params = useParams()

  useEffect(()=>{
   getArtist()
   return null
  },[])


  async function getArtist(){
    const getArt = await getDoc(doc(db, "artistas", params.id))
    
    setArtist({...getArt.data(), id:getArt.id})
    setLoading(false)
  }


  return isLoading? <Loader/>:
  <>
     <div className="artist_title"  ><h2>{artist && artist.artista_nome}</h2></div>  
        <div className='container'>
          <img src={artist.image_url} alt="" className="single_image" ></img>
          <div className='about'>{artist.z_about}</div>
        </div>
  </>
    
  
}

export default Artist 