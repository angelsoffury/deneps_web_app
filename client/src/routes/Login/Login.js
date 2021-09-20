import React from 'react';
import InputField from '../../components/InputField';
import SubmitButton from '../../components/SubmitButton';
import UserStore from '../../stores/UserStore';
import logo from '../../cisco_logo_grey.png';
import './Login.css';
import { Dropdown } from 'reactjs-dropdown-component';
import { runInAction} from "mobx"

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      userEmail: '',
      userCountry: '',
      buttonDisabled: false,
      loading:false
      
    }
    this.countries=[];
  }
  
  async componentDidMount(){
    //Call method to polulate this.countries
    this.countries.push({ 
      label: 'New York',
      value:"newyork"
  });
  this.countries.push({
    label: 'India',
    value:"india"
  });
  this.countries.push({
    label: 'Singapore',
    value:"singapore"
  });
  }

  setInputValue(property, val){
    val=val.trim();
    this.setState({
      [property]:val
    });
  }

  resetForm() {
    console.log("Im at reset Form");
    document.getElementById("alert-msg").innerHTML="";
    document.getElementsByClassName("login-button")[0].style.display="inline-block";
    document.getElementsByClassName("loader")[0].style.display="none";
    this.setState({
      userEmail: '',
      userCountry: '',
      buttonDisabled: false
    })

  }

  async doLogin(){
    if (!this.state.userEmail){
      document.getElementById("alert-msg").style.color="red";
      document.getElementById("alert-msg").innerHTML="Cisco Email & country is required!";
      return;
    }
    if(!this.state.userCountry){
      document.getElementById("alert-msg").style.color="red";
      document.getElementById("alert-msg").innerHTML="Cisco Email & country is required!";
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    
    if(!checkEmailFormat(this.state.userEmail))
    {
      document.getElementById("alert-msg").style.color="red";
      document.getElementById("alert-msg").innerHTML="Enter a valid Cisco email";
      return;
    }
    //Hide Submit button & display loading
    document.getElementById("alert-msg").style.color="black";
    document.getElementsByClassName("login-button")[0].style.display="none";
    document.getElementsByClassName("loader")[0].style.display="inline-block";
    document.getElementById("alert-msg").innerHTML="Checking if user is Valid! "
    
    try{
      
      let user = await fetch("/isValidUser",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: this.state.userEmail,
        })
      });

    
      let userResult= await user.json();

      if(userResult && userResult.success===true){
        runInAction(() => {
        UserStore.isValidUser=true;
        UserStore.userEmail= userResult.useremail;
        UserStore.firstName=userResult.firstname;
        UserStore.lastName=userResult.lastname;
        });
      }
      else {
        document.getElementById("alert-msg").style.color="red";
        document.getElementById("alert-msg").innerHTML="Not a valid Cisco user.Try again!";
        document.getElementsByClassName("login-button")[0].style.display="inline-block";
        document.getElementsByClassName("loader")[0].style.display="none";
        return;
      } 
      //Accept Login Card from Webex teams
      document.getElementById("alert-msg").style.color="black";
      document.getElementById("alert-msg").innerHTML="Goto Webex Teams App & accept the Login";
      document.getElementsByClassName("login-button")[0].style.display="none";
      document.getElementsByClassName("loader")[0].style.display="none"; 
       
      let authRes = await fetch("/loginCardAuth", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: this.state.userEmail,
          usercountry: this.state.userCountry
        })
      });
      
      let dualAuth = await authRes.json();

      if(dualAuth && dualAuth.success===false){
          throw new Error("User rejected login");
      }
      console.log("Completed dual Auth");

      let res = await fetch("/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: this.state.userEmail,
          usercountry: this.state.userCountry
        })
      });
    
      let result = await res.json();
      console.log("Completed login func");
      if(result && result.success===true){
        runInAction(() => {
        UserStore.isLoggedIn= true;
        });
      }
      else if (result && result.success===false){
        this.resetForm();
        alert(result.msg);
      }

    }catch(e){
      console.log(e);
      this.resetForm();
    }

  }

  render(){
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
        <div id="alert-msg">
        &nbsp;
        </div>
        <div class="input-group">
        <InputField
              class="input"
              type ="text"
              placeholder=""
              value= {this.state.userEmail? this.state.userEmail: ''}
              onChange={(val)=>this.setInputValue('userEmail',val)}
            />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Cisco Email</label>
      </div>

        <Dropdown
          name="counties"
          title={this.state.userCountry?this.state.userCountry: "Select your country"}
          searchable={["Search for country", "No matching country"]}
          list={this.countries}
          onChange={(item,name)=> {this.setInputValue('userCountry',item.value)}}
        />
        <div class="loader"></div>

        <SubmitButton
          text= "Next"
          className="login-button"
          disabled= {this.state.button}
          onClick= {()=>this.doLogin()}
        />
      </div>
      </div>
    );
  }
}
export default Login;


//Function to Check email fomrat has cisco.com
   function checkEmailFormat(inputEmail){
    var validator = require("email-validator");
    if (inputEmail && validator.validate(inputEmail) ){
      var domain= inputEmail.split('@')[1];
      if(domain==="cisco.com") return true;
      else return false;
    }
    else return false;
  }

