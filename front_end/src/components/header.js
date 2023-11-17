import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
import pfp from '../static/images/pfp.jpg';
import SignInCtrl from './SignInCtrl';
import { useState } from "react";

const Header = (props)=> {
    let [signedIn, setSignedIn] = useState(false);
    return (
      <>
          <div className='header'>
              <img className='logo' src={logo} />
              <SignInCtrl />
              <div className='pfp-container'>
                <img className='pfp-img' src={pfp} />
              </div>
              <input className='search' type='text' placeholder="Search..." />
          </div>
      </>
    );
  }
  
  export default Header;