import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase_config";
import "./playlist_style.css";
import SingleMusica from "../genders/single-musica";
import Loader from "../loader";


function UserPlaylist (){

  const [playlist, setPlaylist] = useState (false)
  const [musicas, setMusicas] = useState([])
  const [ isLoading, setLoading]= useState(true)

  const params= useParams()

  useEffect(()=>{
    getFavoritos()
    getPlaylist()
    return null
  },[])

  async function getFavoritos(){
    setMusicas([])
    const getPL = await getDoc(doc(db,"playlists", params.id))
    if (getPL.data().playlist_nome!=='Favoritos') return getMusicas(getPL.data().musicas)
    
    
      getPL.data().musicas.forEach(async(music)=>{
        const getMusic = await getDoc(doc(db, 'musicas', music))
        const getArtist = await getDoc(doc(db, 'artistas', getMusic.data().artista_id))
        setMusicas(musicas=>[...musicas,{...getMusic.data(),music_id: getMusic.id, ...getArtist.data(), isFavorite:true}])
      })
      setLoading(false)         

  }  

  
  async function getPlaylist(){
    const getPL = await getDoc(doc(db,"playlists", params.id))
    setPlaylist({...getPL.data(), id: getPL.id})
  }

  
  async function getMusicas(musicas){
        musicas.forEach(async(docs) => {
        const getMusica = await getDoc(doc(db, "musicas",docs))
        const getArtistName = await getDoc(doc(db, "artistas", getMusica.data().artista_id))
        const checkFavorites = await getDoc(doc(db, "playlists", localStorage.getItem('fav_playlist_id')))
        if(!checkFavorites.data().musicas) return              setMusicas(musicas=>[...musicas,{...docs.data(), id: docs, artista_nome: getArtistName.data().artista_nome}])
        if(checkFavorites.data().musicas.includes(docs)){
            setMusicas(musicas=>[...musicas,{...getMusica.data(), id: docs, artista_nome: getArtistName.data().artista_nome, isFavorite: true, genderPage: true}])  
        }else{
            setMusicas(musicas=>[...musicas,{...getMusica.data(), id: docs, artista_nome: getArtistName.data().artista_nome, genderPage: true}]) 
        }
    }) 
    setLoading(false)         
  
}  


  async function removeSong(id){
    const newMusicsArray = musicas.filter((musica)=>musica.music_id!==id)
    const newArrayToDatabase = []
    for await (let i of newMusicsArray){ 
      newArrayToDatabase.push(i.music_id)
    } 
    await updateDoc(doc(db, 'playlists', playlist.id), {
      musicas: newArrayToDatabase
    })
    setMusicas(newMusicsArray)
  }


  return (
    <>

      <div className="playlist_title">
        <h2 className="middle" onClick={() =>console.log(musicas)}>{playlist && playlist.playlist_nome}</h2>
      </div>
      {isLoading ? <Loader/>:
      <div className="musics">
        
        {musicas && musicas.map((musica, index)=>(
          <SingleMusica key={index} removeSong={()=>removeSong(musica.music_id)} musica={musica}/>
        ))}
      </div>
}
    </>
  )
}
 
export default UserPlaylist