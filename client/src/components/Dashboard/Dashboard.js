import React from 'react';
import "./Dashboard.css";

export default function Dashboard() {
  function openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }
  return(
    <div>
      <div id="mySidenav" class="sidenav">
        <a href="#" class="closebtn" onClick={closeNav}>&times;</a>
        <a href="#">Home</a>
        <a href="#">Points</a>
        <a href="#">Requests</a>
        <a href="#">Admin</a>
      </div>
  <div id="main">
    <h2>Dashboard</h2>
    <p>DATA to be Added</p>
    <span style={{"font-size":'30px','cursor':'pointer'}} onClick={openNav}> &#9776; open</span>
  </div>
    </div>
    
  );
  
}