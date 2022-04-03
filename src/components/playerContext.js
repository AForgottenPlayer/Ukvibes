import React, { createContext, useState } from 'react'
import Player from "./player"



export const Musica_a_tocar= createContext(null)

export default function PlayerContext({children}) {


    const [playerActive, setPlayerActive]= useState(false)
    const [musicPassedToPlayer, setmusicPassedToPlayer] = useState(false)

    return (
        <Musica_a_tocar.Provider value={{playerActive, setPlayerActive, musicPassedToPlayer, setmusicPassedToPlayer}}>
                <div className='div_floating_player_container'>
                    <Musica_a_tocar.Consumer> 
                        {value=> playerActive&& <Player music={musicPassedToPlayer}/>}
                    </Musica_a_tocar.Consumer> 
                </div>  
                {children}
        </Musica_a_tocar.Provider>
    )
}
