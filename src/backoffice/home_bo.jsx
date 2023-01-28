import { addDoc, collection} from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useEffect, useState  } from 'react';
import { ImFolderUpload } from 'react-icons/im';
import {db, storage } from '../config/firebase_config';
import "./admin.css";
import {v4} from "uuid"
function Home_bo() {

  const artistaCollectionRef = collection(db, "artistas")
  const [newName, setNewName] = useState();
  const [link, setLink] = useState();
  const [about, setAbout] = useState();

  const imageListRef = ref(storage,"images/")
  const [imgUpload, setImgUpload] = useState(null)
  const [ imgList, setImgList] = useState([])

  
  const uploadImg = ()=>{
    if (imgUpload == null) return;
    const imageRef = ref(storage,`images/${imgUpload.name + v4() }`);
    uploadBytes(imageRef, imgUpload).then((snapshot)=>{
      alert("image uploaded")
      getDownloadURL(snapshot.ref).then((url) =>{
        setImgList((prev)=> [...prev,url])
      })
    });
  }
  useEffect(()=>{
    listAll(imageListRef).then((response=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImgList((prev)=> [...prev, url])
        })
      })
    }))
  },[])
  
  const  addArtistaFunction = async() =>{

   await addDoc(artistaCollectionRef,{
    artista_nome: newName,
    image_url: link,
    z_about: about});
    console.log()
    alert("artista added")
  }

  return (
    <div className='container-border'>
      <h1>Add Artista</h1>
      <input type='file' onChange={(e)=>{setImgUpload(e.target.files[0])}}/>
      <button onClick={uploadImg}><ImFolderUpload></ImFolderUpload></button>
      

      <form>
        <div className='form-group'>
          <label>Nome do Artista</label>
          <input 
           type='text' id="artista_nome" placeholder='Nome do Artista'className='input_admin' required onChange={(e) => {setNewName(e.target.value);}} />
        </div>

        <div className='form-group'>
          <label>image_url</label>
          <input 
            type='text' id="image_url" placeholder='image_url' className='input_admin' onChange={(e) => {setLink(e.target.value);}}  />
        </div>

        <div className='form-group'>
          <label>About</label>
          <textarea id='z_about' rows='5' placeholder='About Artista' className='textadmin' onChange={(e) => {setAbout(e.target.value);}}/>
          
          <button className='admin_button' onClick={()=> addArtistaFunction()}>Send</button>
        </div>
      </form>
     </div>
  )
}

export default Home_bo