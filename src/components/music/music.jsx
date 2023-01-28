import React, { useState } from 'react';
import "./music_styles.css";
import Axios from "axios";
//import useSound from 'use-sound';
 import song from "./audio/BrunoMars_JustTheWayYouAre.mp3"; 



function Music(){

    

        Axios.get("http://localhost:3001/gender-name/"+this.props.match.params.id).then((response)=>{
            const genero = response.data;
            this.setState({genero});

        }) 
       Axios.get("http://localhost:3001/single-gender/"+this.props.match.params.id).then((response)=>{
            const musicas= response.data;
            this.setState({musicas});
        }) 

    

    function redirectMusic(id){
        window.location.assign("/musica/"+id);
    }
      

        return (
            <>
              <div class="container_music">
                <audio controls>
                <source src={song} type="audio/mpeg"></source>
                </audio>
              </div>
            </>
          );
    
}

export default Music