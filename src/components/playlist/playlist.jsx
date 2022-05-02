import React, { useEffect, useState } from "react";
import "./playlist_style.css";
import "./addPlaylist.css";
import { MdAdd, MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase_config";
import { getDocs, collection, addDoc, query, where, updateDoc , doc, deleteDoc, onSnapshot } from "firebase/firestore";
import Modal from "./modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth} from "firebase/auth";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Loader from "../loader";


function Playlist() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]); // display das playlists
  const [addplaylist, setAddplaylists] = useState({ // add uma nova playlist
    modal: false
  })

  const playlistsCollectionRef = collection (db, "playlists")
  const [newName, setNewName] =useState();
  const [ isLoading, setLoading]= useState(true)


  useEffect(() => {
    getPlaylists()
    if(user){
      onSnapshot(query(playlistsCollectionRef,where("user_uid","==",user.uid && user.uid)),(snapshot)=>{
        setPlaylists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      });
    } 
    return null
  }, [])

   async function getPlaylists() {
    if (user){
    const playlists = await getDocs(query(playlistsCollectionRef,where("user_uid","==",user.uid && user.uid)));
    const playlistsList = [];
    playlists.forEach(async(doc) => {
      playlistsList.push({ ...doc.data(), id: doc.id });
    });
    setPlaylists(playlistsList);
    setLoading(false)
  }
 } 

  const addPlaylistFunction = async () => { 
    await addDoc(playlistsCollectionRef,{
      musicas: [],
      playlist_nome: newName, 
      user_uid:user.uid  });  
      console.log("Playlist Added")
      alert("Playlist Added")


    setAddplaylists({
      ...addplaylist,
      modal: false,
    })
  }
  //context menu

  const updatePlaylist = async (id, playlist_nome) => {
   console.log(id)
    const update = prompt("Rename Here")
    const playlistDoc = doc(db, "playlists", id)

    await updateDoc(playlistDoc,{
      playlist_nome : update 
    })
    console.log(id, playlist_nome) 
  }
   
   const deletePlaylist = async (id) => {
    try{
       await deleteDoc(doc(db, "playlists", id)) 
    } catch (e){
        console.log(e)
  }
}
 
  return (
    <>
      <Modal
        show={addplaylist.modal}
        close={() => {
          setAddplaylists({ ...addplaylist, modal: false });
        }}>
        <div className="container_add">
          <div className="add_box">
            <div className="title">
              <h1>New Playlist</h1>
            </div>
            <div className="playlistName">
              <input id="playlist_nome" type="text" className="text_input" placeholder="Playlist" onChange={(e) => { setNewName(e.target.value);}}></input>
            </div>
            <button className="add_button" onClick={() => addPlaylistFunction()}>Add</button>
          </div>
        </div>
      </Modal>

        <div className="playlist_title">
          <h2 className="middle"> Your Playlists</h2>
          <button
            onClick={() => setAddplaylists({ ...addplaylist, modal: true })}
            className="add">
            <MdAdd className="inside"></MdAdd>
          </button>
        </div>

      {isLoading ? <Loader/>:
      <div className="grid">
        
        {playlists.map((playlist, index) => (
          
          
          <ContextMenuTrigger key={index} id={`contextmenu${index}`}>
            <div key={index} className="single_playlist" onClick={() => navigate("/userPlaylist/" + playlist.id)}>
              <h3>{playlist.playlist_nome.toUpperCase()}</h3>
            </div>
          
          <ContextMenu id={`contextmenu${index}`}>        
            <MenuItem onClick={()=>updatePlaylist(playlist.id)} >
              <MdDriveFileRenameOutline className="edit"/>
              <span>Rename Playlist</span>
            </MenuItem>


            <MenuItem onClick={() => deletePlaylist(playlist.id)}>
              <RiDeleteBin6Line className="delete"/>
              <span>Delete</span>
            </MenuItem>
          </ContextMenu>
          </ContextMenuTrigger>
         
        ))}
      </div> }
    </>
  );

}
export default Playlist