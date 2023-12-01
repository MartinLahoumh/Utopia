//hooks
import { useState } from "react";
import { useCookies } from 'react-cookie';

//assets
import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
import tempAd from '../static/images/mcDonald-ad.jpg';
import profileIcon from '../static/images/profile-icon.png';
import imageIcon from '../static/images/image-icon.png';
import videoIcon from '../static/images/video-icon.png';
//import pfp from '../static/images/yoda-dark-the-dark-side-of-force.jpg';

//components
import SignInCtrl from './SignInCtrl';

const Profile = (props) => {
  return (
    <div className='pfp-container'>
      <img className='pfp-img' src={props.pfp} />
      Profile
    </div>
  )
}

const Header = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);

  return (
    <>
      <div className='header'>
        <img className='logo' src={logo} />
        {cookies.loggedIn == true ? <Profile pfp={props.pfp} /> : <SignInCtrl />}
        <input className='search' type='text' placeholder="Search..." />
        <br />

        {/*These are all the filter. They are the 3 icons in the header */}
        <div className="filter-option-container">
          <div className="ad-container icon-container">
            <img className='ad icon' id='icon'src={profileIcon}/>
            <label className="icon-label" id='icon-label'>Profiles</label>
          </div>
          <div className="ad-container icon-container">
            <img className='ad icon' src={imageIcon}/>
            <label className="icon-label">Images</label>
          </div>
          <div className="ad-container icon-container">
            <img className='ad icon' src={videoIcon}/>
            <label className="icon-label">Videos</label>
          </div>
        </div>

        {/*This is the ad section. It will hold an ad */}
        <a href="https://www.mcdonalds.com/us/en-us.html" target='_blank'className="ad-container">
          <img className='ad' src={tempAd}/>
        </a>
      </div>
    </>
  );
}

export default Header;