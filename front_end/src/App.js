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
import { dbGetBalance } from "./db methods/dbGetBalance";

//components
import Header from './components/header';
import PageCtrl from "./components/PageCtrl";
import Browse from './components/browse';

import biden_pfp from './static/images/biden-pfp.jpg';
import ReportFineCard from "./components/report-fine-card";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn', 'uid']);

  //testing
  function removeAllCookies() {
    for (let x in cookies) {
      //removeCookie(x);
    }
  }
  removeAllCookies();
  console.log("cookies", cookies);
  //automatically create an anonymous user for the client when the app is first used
  useEffect(() => {
    async function createAnonUser() {
      if (cookies.anon_uid == null) {
        const [anon_uid, anon_key, error] = await dbAnonSignUp();
        setCookie("anon_uid", anon_uid);
        setCookie("anon_key", anon_key);

        //console.log("anon error", error);
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

  //RETRIEVING USER INFO ==============================================================================

  //states
  const [info, setInfo] = useState({}); //stores user information
  //state to handle triggering getting user info
  const [requestGetUserInfo, setRequestGetUserInfo] = useState(false);
  //state to handle triggering getting anon user info only
  const [requestGetAnonUserInfo, setRequestGetAnonUserInfo] = useState(false);

  //retrieve user info
  useEffect(() => {
    async function getUserInfo() {
      if (requestGetUserInfo) {
        const [uid, key] = whichCookies();
        console.log("info being used:", uid, key)

        try {
          const [info, error] = await dbGetUserInfo(uid, key, uid);
          const [balance, error2] = await dbGetBalance(uid, key);

          //console.log("balance", balance, error2);

          info["balance"] = balance;

          setInfo(info);
          //console.log(error);
          //console.log("info", info);
        } catch (error) {
          console.log(error);
        } finally {
          setRequestGetUserInfo(false);
        }
      }

    }
    getUserInfo();
  }, [requestGetUserInfo]);

  //retrieve anon user info only
  useEffect(() => {
    async function getAnonUserInfo() {
      if (requestGetAnonUserInfo) {

        try {
          const [info, error] = await dbGetUserInfo(cookies['anon_uid'], cookies['anon_key'], cookies['anon_uid']);

          setInfo(info);
          console.log(error);
          console.log("info", info);
        } catch (error) {
          console.log(error);
        } finally {
          setRequestGetAnonUserInfo(false);
        }
      }

    }
    getAnonUserInfo();
  }, [requestGetAnonUserInfo]);

  //WHEN TO TRIGGER GETTING USER INFO ==============================================================================
  //effect hook that gets user info when the page is first loaded
  useEffect(() => {
    setRequestGetUserInfo(true);
  }, [])

  //function that also triggers getting user info (for manual refresh)
  function triggerGetUserInfo() {
    setRequestGetUserInfo(true);
  }

  //function that also triggers getting user info (for manual refresh)
  function triggerGetAnonUserInfo() {
    setRequestGetAnonUserInfo(true);
  }

  const handleSearchItemChange = (e)=>{
    setSearchItem(e.target.value);
  }

  const searchActiveClicked = ()=>{
    if(searchActive != true){
      setSearchActive(true);
    }
  }



  
  return (
    // wrapping the app component in a CookiesProvider allows cookies to be visible within the whole component
    <CookiesProvider>
      <div className="header-container">
        <Header searchItem={searchItem} handleSearchItemChange={handleSearchItemChange} info={info} whichCookies={whichCookies} triggerGetUserInfo={triggerGetUserInfo} triggerGetAnonUserInfo={triggerGetAnonUserInfo}/>
      </div>
      <div className="App">
        {/* prop drilling; change whichCookies to a context later */}
        <PageCtrl searchItem={searchItem} info={info} whichCookies={whichCookies} triggerGetUserInfo={triggerGetUserInfo} />
      </div>
      <div className='header-container browse-container'>
        <Browse />
      </div>
    </CookiesProvider>
  );
}

export default App;
