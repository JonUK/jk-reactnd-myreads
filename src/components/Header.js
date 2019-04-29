import React from 'react';
import logo from "../logo/logo.svg";

function Header() {
  return (
    <header className="list-books-title">
      <h1>
        <img src={logo} width="60" height="57" alt="" className="list-books-logo"/>
        MyReads
      </h1>
    </header>
  )
}

export default Header;
