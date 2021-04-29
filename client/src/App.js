import React, {Component} from 'react';
//import logo from './cisco_logo.png';
//import sidebar from './sidebar.png';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Points from './components/Points/Points';


class App extends Component {

  constructor(props) { //A constructor, that initializes tshe default state
    super(props);
    this.state = { user: "" };
  
  }

  //componentWillMount() { // A react lifecycle method called componentDidMount(), that will execute the callAPI() method after the component mounts
    //this.callAPI();
  //}
  
  render() {
    if(!this.state.user) {
      console.log (this.state.user+ "@@@@@" );
      return <Login />
    }
    else {
      return (
        <div className="wrapper">
          <h1>DENEPS</h1>
          <BrowserRouter>
            <Switch>
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
