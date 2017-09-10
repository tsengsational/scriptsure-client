import React, { Component } from 'react';
// import './App.css';
import EditorContainer from './containers/EditorContainer'
import HomeContainer from './containers/HomeContainer'
import Navbar from './components/Navbar'
import LoginContainer from './containers/LoginContainer'
import SignUpContainer from './containers/SignUpContainer'
import DashboardContainer from './containers/DashboardContainer'
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Route exact path="/" render={(props)=>{
          return <HomeContainer history={props.history} />
        }} />
        <Route exact path="/signup" render={(props) => {
          return <SignUpContainer history={props.history} />
        }} />
        <Route exact path="/login" render ={(props) => {
          return <LoginContainer history={props.history}/>
        }} />
        <Route exact path="/dashboard" render={(props)=>{
          return <DashboardContainer history={props.history}/>
        }} />
        <Route exact path="/scripts/:id" render={(props)=>{
          return <EditorContainer history={props.history} match={props.match} />
        }} />
      </div>
    );
  }
}

export default App;
