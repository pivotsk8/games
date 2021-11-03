import './App.css';
import React from "react"
import  { Route } from "react-router-dom" 
import Pagprincipal from './modules/principal/principal';
import Landing from './modules/landing/landing';
import Nav from "./modules/Navbar/nav"
import Game from "./modules/Game/Game"
import Form from './modules/Form/form';


function App() {
  return (
    <div className="App">
      <Route exact path="/"component={Landing}/>
      <Route exact path="/home" component={Nav}/>
      <Route path="/home"component={Pagprincipal}/>
      <Route exact path="/id/:id" component={Nav}/>
      <Route  path="/id/:id" component={Game}/>
      <Route exact path="/form" component={Nav}/>
      <Route  path="/form" component={Form}/>
    </div>
  );
}

export default App;
