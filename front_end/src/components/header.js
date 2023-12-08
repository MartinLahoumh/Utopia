//hooks
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
//assets
import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
import tempAd from '../static/images/mcDonald-ad.jpg';
import profileIcon from '../static/images/profile-icon.png';
import imageIcon from '../static/images/image-icon.png';
import videoIcon from '../static/images/video-icon.png';
//import pfp from '../static/images/yoda-dark-the-dark-side-of-force.jpg';

//methods
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";
import { Search } from '../db methods/dbSearch';

//components
import SignInCtrl from './SignInCtrl';
import SelfProfileCtrl from "./SelfProfileCtrl";
import SignOutCtrl from "./SignOutCtrl";

const Header = (props) => {
  //cookies
  const [adIds, setAdIds] = useState([]);
  const [requestGetInitialAds, setRequestGetInitialAds] = useState(false);
  const [requestGetAdInfo, setRequestGetAdInfo] = useState(false);
  const [ads, setAds] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [adURL, setAdURL] = useState("");
  const [adImg, setAdImg] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);

  const loggedInComponent = (
    <>
      <SignOutCtrl triggerGetAnonUserInfo={props.triggerGetAnonUserInfo}/>
      <SelfProfileCtrl info={props.info} 
                       whichCookies={props.whichCookies}
                       triggerGetUserInfo={props.triggerGetUserInfo}/>
    </>
  )

  const loggedOutComponent = <SignInCtrl triggerGetUserInfo={props.triggerGetUserInfo}/>;

  //Get list of ad id's
  useEffect(() => {
    async function handleGetInitialAds() {
        if (requestGetInitialAds) {
            //determine whether to use logged in or anon cookies
            const [uid, key] = props.whichCookies();

            try {
                //before is null in order to get the starting 10
                const [adIds, error] = await Search(uid, key, null, null, [null, null], [null,null] ,["AD"], null, null);

                console.log("AdIds: ", adIds);
                console.log("ERRPR: ",error);
                setAdIds(adIds);

                //now, convert post ids to info by triggering the other effect hook
                triggerGetPostInfo();
            } catch (error) {
                console.log(error);
            } finally {
                setRequestGetInitialAds(false);
            }
        }
    }
    handleGetInitialAds();
  }, [requestGetInitialAds]);

  useEffect(() => {
    setRequestGetInitialAds(true);
  }, [])

  function triggerGetInitialAds() {
      setRequestGetInitialAds(true);
  }

  useEffect(() => {
    async function handleGetAdInfo() {
        if (requestGetAdInfo) {
            //get the right cookies
            const [uid, key] = props.whichCookies();

            try {
                //build new infos (new state value)
                let newAdInfo = [];
                let newUsersInfo = [];

                //iterate through each postid
                console.log("AD IDS IN SEARCH: ", adIds);
                for (const adId of adIds) {
                    //retrieve postinfo
                    const ad = await dbGetPostInfo(uid, key, adId);
                    console.log("CHECK: ", ad[0]);
                    newAdInfo.push(ad[0]);
                    //console.log(job);
                    //console.log("postinfoauthor", postInfo[0]['author']);

                    //from the postinfo results, retrieve userinfo
                    const userInfo = await dbGetUserInfo(uid, key, ad[0]['author']);
                    newUsersInfo.push(userInfo);

                    //console.log(postInfo, userInfo);
                }
                setAds(newAdInfo);
                setUsersInfo(newUsersInfo);
                console.log("ads: ", ads);
                let randIndex = Math.floor(Math.random() * (2));
                console.log("IDNEX:", randIndex);
                setAdURL(newAdInfo[randIndex]['text']);
                setAdImg(newAdInfo[randIndex]['images'][0]);

            } catch (error) {
                console.log(error)
            } finally {
                console.log("ADS: ", ads);
                //console.log("usersinfo", usersInfo);
                setRequestGetAdInfo(false);
            }
        }
    }
    handleGetAdInfo();
  }, [requestGetAdInfo])

  function triggerGetPostInfo() {
    setRequestGetAdInfo(true);
  }

  
  return (
    <>
      <div className='header'>
        <img className='logo' src={logo} />
        {cookies.loggedIn == true ? loggedInComponent : loggedOutComponent}
        <input className='search' value={props.searchItem} onChange={props.handleSearchItemChange} type='text' placeholder="Search..." />
        <br />
        <button>Search</button>
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

        <label>Ad</label>
        {/*This is the ad section. It will hold an ad */}
        <a href={adURL} target='_blank'className="ad-container">
          <img className='ad' src={'http://127.0.0.1:5000' + adImg}/>
        </a>
      </div>
    </>
  );
}

export default Header;