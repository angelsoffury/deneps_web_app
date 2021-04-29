import React from 'react';
import App from '../../App';
import './Login.css';

export default function Login() {

  var clickedSubmit= false;
  var email= "";
  var username = "";
  const initiateLogin= ()=>{
   document.getElementById("webex-banner").innerHTML="Goto your Webex Teams and accept the Login by DENEPS Bot!";
   document.getElementById("webex-banner").style.color="green";
   clickedSubmit=true;
  }

  return(
    <div className="login-wrapper">
      <h1> Cisco DENEPS Log In</h1>
      <form>
      <div id="webex-banner">
        <label>
          <p>Enter Cisco e-mail</p>
          <input type="text" />
        </label>
        <div>
          <button  onClick={initiateLogin} id= "login-submit" type="submit">Submit</button>
        </div>  
        </div>
      </form>
      <div id="loader">
      
      </div>
    </div>
  )
}