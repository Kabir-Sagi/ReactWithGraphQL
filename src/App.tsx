import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import Details from './Components/Details'
import Login from "./Components/Login";
import { initialState, reducer } from './store/reducer/index';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


export const AuthContext = React.createContext({})

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Home}/>
        <Route exact path="/details" component={Details} />
        
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
