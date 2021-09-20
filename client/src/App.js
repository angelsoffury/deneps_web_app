import React from 'react';
import { observer } from 'mobx-react';
import logo from './cisco_logo_white.png';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './routes/Login/Login';
import Dashboard from './routes/Dashboard/Dashboard';
import Requests from './routes/Requests/Requests';
import Orders from './routes/Orders/Orders';
import Points from './routes/Points/Points';
import Admin from './routes/Admin/Admin';
import SubmitButton from './components/SubmitButton';
import UserStore from './stores/UserStore';
import { runInAction} from "mobx"


class App extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch("/isLoggedIn", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success){
        runInAction(() => {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.isValidUser=true;
        UserStore.firstName = result.firstname;
        UserStore.lastName = result.lastname;
        UserStore.userEmail = result.useremail;
        });
      }
      else {
        runInAction(() => {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.isValidUser=false;
        });
      }
    }catch(e) { 
      runInAction(() => {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      });
    }
  }

  async doLogout(){
    try{
      console.log("Im in Logout func");
      let res = await fetch("/logout", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();
      console.log("Logout result is", result);
      if (result && result.success){
        runInAction(() => {
        UserStore.isLoggedIn = false;
        UserStore.firstName = '';
        UserStore.lastName = '';
        UserStore.userEmail = '';
        });
      }

    }catch(e) { 
      console.log(e);
    }
  }

  render(){
    if(UserStore.loading){
      return(
        <div className="page-loading"></div>
      )
    }
    else{
      if (UserStore.isLoggedIn && UserStore.isValidUser) {
        return(
          <div className="wrapper">
          <div className="app-header">
            {//<span id="App-sidebar" onClick={this.openNav} alt ="sidebar"> &#9776;</span>
            }
            <img src={logo} className="app-logo" alt="logo" />
            <div className= "app-header-text">DENEPS</div>
            <div className="user-card">
              {UserStore.firstName[0]} {UserStore.lastName[0]}
              <SubmitButton 
              text={'Log Out'}
              disabled={false}
              onClick={()=>{this.doLogout() }}
            />
            </div>
          </div>
          <div id="mySidenav" className="sidenav">
              {//<a href="#" class="closebtn" onClick={this.closeNav}>&times;</a>
              }
              <a href="/dashboard" >Home</a>
              <a href="/points " >Points</a>
              <a href="/requests" >Requests</a>
              <a href="/orders" >Orders</a>
              <a href="/admin">Admin</a>
          </div>
          <div className="app-content ">
          
          <BrowserRouter>
            <Switch>
            <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/points">
                <Points />
              </Route>
              <Route path="/requests">
                <Requests/>
              </Route>
              <Route path="/orders">
                <Orders/>
              </Route>
              <Route path="/admin">
                <Admin/>
              </Route>
            </Switch>
          </BrowserRouter>
          </div>
        </div>
        )
      }
      return(
        <div className="wrapper">
          <Login/>
        </div>
      )
    } 
  }
}


export default observer(App);
