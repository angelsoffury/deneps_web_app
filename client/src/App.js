import React, {Component} from 'react';
import logo from './cisco_logo_white.png';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Points from './components/Points/Points';


class App extends Component {

  state = { user: null}

  handleChange = (newValue) => {
    this.setState({ user: newValue });
  }

  openNav=()=>{
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  closeNav=()=> {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }
  
  
  render() {
    if(this.state.user) { //Make it ! to enable login
      return(
          <Login user={this.state.user} onChange={this.handleChange}/>
      );
    }
    else {
      return (
        <div className="wrapper">
          <div className="App-header">
            <span id="App-sidebar" onClick={this.openNav} alt ="sidebar"> &#9776;</span>
            <img src={logo} className="App-logo" alt="logo" />
            <div className= "App-header-text">DENEPS</div>
            <div id="mySidenav" class="sidenav">
              {//<a href="#" class="closebtn" onClick={this.closeNav}>&times;</a>
              }
              <a href="/dashboard">Home</a>
              <a href="/points">Points</a>
              <a href="#">Requests</a>
              <a href="#">Admin</a>
          </div>
          </div>
          <BrowserRouter>
            <Switch>
            <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/dashboard" component={Dashboard}>
                <Dashboard />
              </Route>
              <Route path="/points" component={Points}>
                <Points />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
