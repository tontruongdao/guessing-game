import React, { createContext } from 'react';
import { auth } from '../services/firebase';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
  
    React.useEffect(() => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                    setAuthenticated(true);
                    setLoading(false)
                } else {
                    setAuthenticated(false);
                    setLoading(false)
                }
            })
        }, []
    )

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <AuthContext.Provider value={{ authenticated, loading, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;