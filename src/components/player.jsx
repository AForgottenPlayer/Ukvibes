import React, { useRef, useEffect, useState} from "react";
import "./genders/gender_style.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiCloseFill } from 'react-icons/ri'


export default function Player(props){

  const [isPlaying, setIsPlaying] = useState(false)//true
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
 

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  
  useEffect(()=>{
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    audioPlayer.current.play(); 
    progressBar.current.max = seconds;
    return null
}, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
  
  const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
}

const togglePlayPause = () => {
  const prevValue = isPlaying;
  setIsPlaying(!prevValue);//o oposto do whatever is playing, se o isplaying é true, o !isplaying vai por falso e vice versa
  if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
  } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
  }

}

const whilePlaying = () => { 
  progressBar.current.value = audioPlayer.current.currentTime;
  changePlayerCurrentTime();
  animationRef.current = requestAnimationFrame(whilePlaying);
}
const changeRange = () => {
  audioPlayer.current.currentTime = progressBar.current.value;
  changePlayerCurrentTime();
}

const changePlayerCurrentTime = () => {
  progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
  setCurrentTime(progressBar.current.value);
}


  return (
    <>
    <div className="music_hover" >
        <audio ref={audioPlayer} src={props.music.musica_url} preload="metadata"></audio>    
        <button onClick={togglePlayPause} className="playPause" >
            {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <h6>{props.music.artista_nome}</h6>
        <h6>{props.music.musica_nome}</h6> 
        
        {/* current Time*/}
            <div className='currentTime'>{calculateTime(currentTime)}</div>
       
        {/* progress bar*/}
        <div>
            <input type='range' className='progressBar' defaultValue="0" ref={progressBar} onChange={changeRange}></input>
        </div>
        {/* duration */}
        <div className='duration'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
     
      
      <button onClick={()=>props.closePlayer.setPlayerActive(false)} className="close"><RiCloseFill/></button> 
    
    </div>
    

</>
  )
}