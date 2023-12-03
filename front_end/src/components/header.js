//hooks
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
import SelfProfileCtrl from "./SelfProfileCtrl";
import SignOutCtrl from "./SignOutCtrl";


const Header = (props) => {
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);

  const loggedInComponent = (
    <>
      <SignOutCtrl />
      <SelfProfileCtrl info={props.info}/>
    </>
  )

  const loggedOutComponent = <SignInCtrl />;

  return (
    <>
      <div className='header'>
        <img className='logo' src={logo} />
        {cookies.loggedIn == true ? loggedInComponent : loggedOutComponent}
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