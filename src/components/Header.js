import React from 'react';
import logo from "../logo/logo.svg";

function Header() {
  return (
    <div className="list-books-title">
      <h1>
        <img src={logo} width="60" height="57" alt="" className="list-books-logo"/>
        MyReads
      </h1>
    </div>
  )
}

export default Header;
