import React, { useEffect, useState, useContext } from 'react'
import "./gender_style.css";
import { FaPlay, FaPause, FaList} from "react-icons/fa"
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from "react-icons/md";
import { Musica_a_tocar } from '../playerContext';
import { db } from '../../config/firebase_config';
import { getDocs,doc, collection, query, where, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css';

export default function SingleMusica(props){
  
  
    const playlistsCollectionRef = collection (db, "playlists")
    const {playerActive, setPlayerActive, setmusicPassedToPlayer} = useContext(Musica_a_tocar)
    const [isLoading]= useState()
    const [isPlaying, setIsPlaying] = useState(false);
    const [list,setList] = useState();
    const [isFav, setIsFav] = useState(props.musica.isFavorite);
    const auth = getAuth();
    const [user] = useAuthState (auth);
    
    const [isLoggedIn, setLoggedIn] = useState(false);
    onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser) setLoggedIn(true)
      if(!currentUser) setLoggedIn(false)
    })  
    

    useEffect(()=>{
      showplaylists()
  
      return null
    }, [ playerActive?.props]);

    function startSong(){
      const prevValue = isPlaying;

      setmusicPassedToPlayer(props.musica)
      setPlayerActive(true)
        setIsPlaying(!prevValue);//o oposto do whatever is playing, se o isplaying é true, o !isplaying vai por falso e vice versa
        if (!prevValue) {
            playerActive.current.play();
        } else {
            playerActive.current.pause(); 
        }
    }

    async function addFavorite(id){
      let favouritesId=0
      let lastMusics={}
      const newMusicsArray= []
      const getFavListByUserId= await getDocs(query(collection(db, "playlists"), where("user_uid","==",user.uid), where('playlist_nome',"==", 'Favoritos')))
      getFavListByUserId.forEach((doc)=>{
        favouritesId=doc.id
        lastMusics=doc.data().musicas
      })
      
      if(lastMusics){
        lastMusics.push(id)
        await updateDoc(doc(db, 'playlists', favouritesId), {
          musicas: lastMusics
        })
      }else{
        newMusicsArray.push(id)
        await updateDoc(doc(db, 'playlists', favouritesId), {
          musicas: newMusicsArray
        })
      }
      setIsFav(!isFav)
  }  

  async function showplaylists() {
    if (user){
    const playlists = await getDocs(query(playlistsCollectionRef,where("user_uid","==",user.uid && user.uid)));
    const playlistsList = [];
    playlists.forEach(async(doc) => {
      playlistsList.push({ ...doc.data(), id: doc.id });
    });
    setList(playlistsList);
  }
 }

 async function removeSong(){
    const getMusicasToRemove = await getDoc(doc(db, 'playlists', localStorage.getItem('fav_playlist_id')))
    const newArrayToDatabase = getMusicasToRemove.data().musicas.filter((musica)=>musica!==props.musica.id)
    await updateDoc(doc(db, 'playlists', localStorage.getItem('fav_playlist_id')), {
      musicas: newArrayToDatabase 
    }) 
    setIsFav(!isFav)
 }

 async function addToPlaylist(musicaid, playlistid){
  const songPlaylist= await getDoc(doc(db, 'playlists', playlistid))
   
  if(songPlaylist.data().musicas.includes(musicaid)) return alert("Essa música já está na playlist")
  const newArray = [...songPlaylist.data().musicas, musicaid]

  try{
    await updateDoc(doc(db, 'playlists', playlistid), {
      musicas: newArray
    })
    alert("Música adicionada com sucesso")
    
  }catch(e){
    console.log(e)
    
  }
}

  return (
  <>
      {isLoading ? "":
    
        <div className="music" >
            <button onClick={()=>startSong()} className="playPause" >
            { isPlaying ? <FaPause/> : <FaPlay/>}
            </button>
            <h2>{props.musica.artista_nome}</h2>
            <h2>{props.musica.musica_nome}</h2> 
            {isLoggedIn ? <> 

            <div className='favorite'>
            {isFav ? <i style={{padding: 20}} onClick={props.musica.genderPage ? ()=>removeSong() :props.removeSong}><MdFavorite/></i> : <i style={{padding: 20}} onClick={() => addFavorite(props.musica.id)}><GrFavorite/></i>}
            </div>

            <div onClick={()=>showplaylists()}>
            
            <Menu menuButton={<MenuButton className='watchlist' > <FaList/></MenuButton>}>
              {list && list.map((lista, index)=>(
                <MenuItem key={index} onClick={()=>addToPlaylist(props.musica.id, lista.id)}>{lista.playlist_nome}</MenuItem>
                
              ))}
            </Menu>
            </div>
          
            {/* <button onClick={()=> download()} className="download">
            <BsDownload/>
            </button> */}
            </> :""} 
          </div>} 
      
    </>
  )
}
