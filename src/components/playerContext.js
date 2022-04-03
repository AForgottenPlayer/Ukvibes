import React, { createContext, useState } from 'react'
import Player from "./player"



export const MusicaATocar= createContext(null)

export default function PlayerContext({children}) {


    const [playerActive, setPlayerActive]= useState(false)
    const [musicPassedToPlayer, setmusicPassedToPlayer] = useState(false)

    return (
        <MusicaATocar.Provider value={{playerActive, setPlayerActive, musicPassedToPlayer, setmusicPassedToPlayer}}>
                <div className='div_floating_player_container'>
                    <MusicaATocar.Consumer> 
                        {value=> playerActive&& <Player music={musicPassedToPlayer}/>}
                    </MusicaATocar.Consumer> 
                </div>  
                {children}
        </MusicaATocar.Provider>
    )
}
