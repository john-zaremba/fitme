import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faBook, faRightToBracket, faCheckToSlot } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ user }) => {
  const [open, setOpen] = useState(false)
  const handleMenuClick = () => {
    setOpen(!open)
  }

  const unauthenticatedListItems = [
    <Link 
      className="menu-item" 
      to="/users/new" 
      onClick={handleMenuClick}
    >
      <FontAwesomeIcon icon={faCheckToSlot} className="menu-item-icon" /> Sign Up
    </Link>,
    <Link 
      className="menu-item" 
      to="/user-sessions/new" 
      onClick={handleMenuClick}
    >
      <FontAwesomeIcon icon={faRightToBracket} className="menu-item-icon" /> Sign In
    </Link>
  ]

  const authenticatedListItems = [  
    <Link 
      className="menu-item" 
      to="/users/profile" 
      onClick={handleMenuClick}
    >
      <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> Profile
    </Link>,
    <Link 
      className="menu-item"
      to="/logs" 
      onClick={handleMenuClick}
    >
      <FontAwesomeIcon icon={faBook} className="menu-item-icon" /> My Logs
    </Link>,
    <SignOutButton />
  ]

  const dropdownMenu = (
    <ul className="dropdown">
      {user ? authenticatedListItems : unauthenticatedListItems}
    </ul>
  )

  return (
    <div className="my-top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="">
            <Link className="menu-link" to="/">My Easy Tracker</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <FontAwesomeIcon
          className="menu-icon"
          icon={faBars}
          onClick={handleMenuClick}
        />
        {open && dropdownMenu}
      </div>
    </div>
  );
};

export default TopBar;