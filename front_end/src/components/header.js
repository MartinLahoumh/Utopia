//hooks
import { useState } from "react";
import { useCookies } from 'react-cookie';

//assets
import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
//import pfp from '../static/images/yoda-dark-the-dark-side-of-force.jpg';

//components
import SignInCtrl from './SignInCtrl';
import Profile from "./profile";



const Header = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);

  return (
    <>
      <div className='header'>
        <img className='logo' src={logo} />
        {cookies.loggedIn == true ? <Profile pfp={props.pfp} /> : <SignInCtrl />}
        <input className='search' type='text' placeholder="Search..." />
      </div>
    </>
  );
}

export default Header;