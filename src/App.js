import GlobalStyles from "./styles/GlobalStyles";
import React, { useContext } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';
import AuthContext, { AuthProvider } from './context/AuthContext'

//  ########## Helper Function ##########

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/gameroom' />}
    />
  )
}

// #######################################

const App = () => {

  const { authenticated } = useContext(AuthContext)

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/gameroom" authenticated={authenticated} component={GameRoom}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    );
}

export default App;