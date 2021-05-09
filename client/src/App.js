import React, {Component} from 'react';
//import logo from './cisco_logo.png';
//import sidebar from './sidebar.png';
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
  
  
  render() {
    if(!this.state.user) {
      return(
          <Login user={this.state.user} onChange={this.handleChange}/>
      );
    }
    else {
      return (
        <div className="wrapper">
          <div className="pageHeader">
          </div>
          <BrowserRouter>
            <Switch>
            <Route path="/">
                <Dashboard />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/points">
                <Points />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
    

    /*return (
      <div className="App">
        <header className="App-header">
          <img src={sidebar} className="App-side-bar" alt ="sidebar"/>
          <img src={logo} className="App-logo" alt="logo" />
          <div className= "App-header-text">DENEPS</div>
        </header>
        <body className="App-data">
        <p className= "App-intro">
            {this.state.apiResponse}
          </p>
        </body>
      </div>
    );*/
  }
}

export default App;
