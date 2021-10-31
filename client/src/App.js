import './App.css';
import React from "react"
import { Route } from "react-router-dom" 
import Pagprincipal from './modules/principal/principal';
import Landing from './modules/landing/landing';
import Nav from "./modules/Navbar/nav"
import Game from "./modules/Game/Game"


function App() {
  return (
    <div className="App">
      <Route exact path="/"component={Landing}/>
      <Nav/>
      <Route path="/home"component={Pagprincipal}/>
      <Route  path="/id/:id" component={Game}/>
    </div>
  );
}

export default App;
