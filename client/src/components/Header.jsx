import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';

function Header(props) {

  function logoutUser() {
    // Log out user and redirect to '/login'
    localStorage.removeItem("user");
    window.location.href = '/login';
  }

  return (
    <header>
      <h1>
        <HighlightIcon />
        Note Keeper
      </h1>
      <div style={{display: "flex"}}>
        <p style={{alignSelf: "center", margin: "0 25px", color: "#fff"}}>{props.username}</p>
        <button
          id="btn-logout"
          onClick={logoutUser}>Log Out</button>
      </div>
      
           
    </header>
  );
}

export default Header;
