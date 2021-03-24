import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { signout } from '../helpers/auth'

const GameRoom = () => {
    const { user } = useContext(AuthContext)
    console.log(user)

    return(
        <div>
            GameRoom
            <h1>
                {user.email}
            </h1>
            <button onClick={signout}>
                Signout
            </button>
        </div>
    )
}

export default GameRoom;