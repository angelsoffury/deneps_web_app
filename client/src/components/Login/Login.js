import React from 'react';
import logo from '../../cisco_logo_grey.png';
import './Login.css';

export default function Login(props){
    var userDetails = {}, teamsLogIn=false;
  
    //props.onChange(result)
    /* Function to change properties of login box */
    function initiateLogin(){
      document.getElementById("login-submit").addEventListener("click", function(event){
        event.preventDefault()
      });
      var inputEmail= document.getElementById("email").value;
      console.log (inputEmail);
      var x= checkEmailFormat(inputEmail);
      if(x=== 0){
        loginAPI(inputEmail)
        .then(loginStatus =>{
          if(loginStatus===true) {
            document.getElementById("login-error").innerHTML="";
            document.getElementById("webex-banner").innerHTML="Accept the Login card by DENEPS Bot in Webex Teams!";
            document.getElementById("webex-banner").style.color="green";
            pushWebexLoginCard(inputEmail)
            .then(acceptCard=> {
              if(acceptCard===true) {
                props.onChange(userDetails)
              }
              else{
                document.getElementById("webex-banner").innerHTML="";
                document.getElementById("login-error").innerHTML="Authentication rejected on Teams. Refresh page to Try again!";
                document.getElementById("login-error").style.color="red";
                
              }
            });
          }
          else {
            document.getElementById("login-error").innerHTML="User e-mail not Found. Try again!";
            document.getElementById("login-error").style.color="red";
          }
        });

      }else if (x===1){
        document.getElementById("login-error").innerHTML="Email format is invalid. Try again!";
        document.getElementById("login-error").style.color="red";
      } else if (x===2){
        document.getElementById("login-error").innerHTML="Enter a cisco.com email. Try again!";
        document.getElementById("login-error").style.color="red";
      }
  
    }
    /*Function to Check email fomrat has cisco.com*/
    function checkEmailFormat(inputEmail){
      var validator = require("email-validator");
      if (inputEmail && validator.validate(inputEmail) ){
        var domain= inputEmail.split('@')[1];
        if(domain==="cisco.com") return 0;
        else return 2;
      }
      else return 1;
    }

    /* Funtion to call express backend */
    async function loginAPI(email) {
        var error= 0; 
        await fetch("/login/"+email)
        .then(checkStatus)
        .then(res => res.json())
        .then (result =>{userDetails=result})
        .catch(err => {error++; });

        if (error>0) return false;
        else return true;
    }

    async function pushWebexLoginCard(email) {
      var error= 0; 
      await fetch("/login/"+email, {method: 'POST'})
      .then(checkStatus)
      .then(res => res.json())
      .then (result =>{teamsLogIn = result})
      .catch(err => {error++; });

      if (error>0) return false;
        else return true;

    }

    function checkStatus (res) {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
      }
    }
  return(
      <div className="login-page"> 
      <div className="login-wrapper">
        <div className="cisco-logo">
          <img src={logo}  id= "login-cisco-logo" alt="logo" />
        </div>
        <div className="login-heading">
          <div className="heading-bold"> Cisco </div>
          <div className="heading">DENEPS</div>
        </div>
        <div id="login-error">
        </div>
        <form action="#">
        <div id="webex-banner">
          <label>
            <p id="tag"> Cisco email</p>
            <div className="input-field">
              <input id="email" type="text" />
            </div>
          </label>
          <div id="login-error">
        </div>
          <div className="button-field">
            <button  className= "btn btn-primary" onClick={initiateLogin} id= "login-submit" type="submit">Submit</button>
          </div>  
          </div>
        </form>
        </div>
      </div>
  )
}
