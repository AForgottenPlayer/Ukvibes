import React, { useEffect, useState} from 'react';       
import "./home_style.css";
import { Link } from 'react-router-dom';
import image from "./HM.jpg"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ImFolderUpload }from "react-icons/im";
import { storage } from '../../config/firebase_config';
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";

function Home(){
  const auth = getAuth();
  const [showLogin, setShowLogin] = useState(false);
    onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser) setShowLogin(true)
      if(!currentUser) setShowLogin(false)
    })
  
  const imageListRef = ref(storage,"images/")
  const [imageUpload , setImageUpload] = useState(null) 
  const [imageList, setImageList] = useState([])
  
  const uploadImage = ()=> {
    if (imageUpload == null) return;
    const imageRef = ref(storage,`images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url) =>{
        setImageList((prev)=> [...prev, url])
      }) 
    });
  };
  
  useEffect(()=>{
    listAll(imageListRef).then((response =>{
      response.items.forEach((item)=>{
      getDownloadURL(item).then((url)=>{
        setImageList((prev) => [...prev,url])
      }) 
      })
    }))
  }, []);

  return (
    <>
     <div className='home' style={{backgroundImage: `url(${image})`}}>
      <div className='headerContainer'>
        <h1 > UkVibes Awaits You </h1>
     
      {showLogin? "": <>  
        <Link to="/login">
          <h2>Sign Up For The Features</h2>
        </Link>
          
      </>}
      </div>
    </div>
    <input type="file"
    onChange={(event) => {
      setImageUpload(event.target.files[0])}}/>
    <button onClick={uploadImage}><ImFolderUpload></ImFolderUpload></button>
    {imageList.map((url) => {
      return <img  src={url}/>
    })}
    </>
)}

export default Home  

