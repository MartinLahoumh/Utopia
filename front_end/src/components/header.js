import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
//import pfp from '../static/images/yoda-dark-the-dark-side-of-force.jpg';
import SignInCtrl from './SignInCtrl';
import { useState } from "react";

const Profile = (props) =>{
  return(
    <div className='pfp-container'>
                <img className='pfp-img' src={props.pfp} />
    </div>
  )
}

const Header = (props)=> {
    let [signedIn, setSignedIn] = useState(false);
    return (
      <>
          <div className='header'>
              <img className='logo' src={logo} />
              {signedIn == true?
              <>
                <Profile pfp={props.pfp} />
              </>:<SignInCtrl />}
              <input className='search' type='text' placeholder="Search..." />
          </div>
      </>
    );
  }
  
  export default Header;