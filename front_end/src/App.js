//hooks
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from 'react-cookie';

//assets
import './App.css';
import './static/css/account-page.css';

//methods
import { dbAnonSignUp } from "./db methods/dbAnonSignUp";
import { dbGetUserInfo } from "./db methods/dbGetUserInfo";
import { dbGetPosts } from "./db methods/dbGetPosts";

//components
import Header from './components/header';
import PageCtrl from "./components/PageCtrl";
import Browse from './components/browse';

import biden_pfp from './static/images/biden-pfp.jpg';
import ReportFineCard from "./components/report-fine-card";
import ViewCard from "./components/view-post-card";

function App() {
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);

  //states
  const [info, setInfo] = useState({}); //stores user information
  //hooks
  //testing
  function removeAllCookies() {
    for (let x in cookies) {
      removeCookie(x);
    }
  }
  //removeAllCookies();
  //console.log("cookies", cookies);
  //automatically create an anonymous user for the client when the app is first used
  useEffect(() => {
    async function createAnonUser() {
      if (cookies.anon_uid == null) {
        const [anon_uid, anon_key, error] = await dbAnonSignUp();
        setCookie("anon_uid", anon_uid);
        setCookie("anon_key", anon_key);
      }
    }

    try {
      createAnonUser();
    } catch (error) {
      console.log(error);
    }
  }, [])


  //function to decide which cookies to use
  function whichCookies() {

    let uid = cookies['uid'];
    let key = cookies['key'];
    if (cookies['uid'] == null) {
      uid = cookies['anon_uid'];
      key = cookies['anon_key'];
    }
    return [uid, key];
  }

  //if the user is logged in, retrieve user info
  //TODO: when to properly trigger this refresh??
  useEffect(() => {
    async function getUserInfo() {
      const [uid, key] = whichCookies();
      //console.log("info being used:", uid, key)
      
      const [info, error] = await dbGetUserInfo(uid, key, uid);
        setInfo(info);
    }
    getUserInfo();
  }, [cookies["uid"]]);

  //display logic


  const suggested_users = [] //Get from the backend and fill it here
  const trending_users = [] //Get from the backend and fill it here

  
  return (
    // wrapping the app component in a CookiesProvider allows cookies to be visible within the whole component
    <CookiesProvider>
      <div className="header-container">
        <Header info={info} />
      </div>
      <div className="App">
        {/* prop drilling; change whichCookies to a context later */}
        <PageCtrl info={info} whichCookies={whichCookies}/>
      </div>
      <div className='header-container browse-container'>
        <Browse />
      </div>
    </CookiesProvider>
  );
}

export default App;
