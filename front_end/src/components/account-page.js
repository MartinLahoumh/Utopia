//hooks
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from 'react-cookie';

//assets
import '../static/css/account-page.css';

//methods
import { dbAnonSignUp } from "../db methods/dbAnonSignUp";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";
import { dbGetPosts } from "../db methods/dbGetPosts";

//components

import biden_pfp from '../static/images/biden-pfp.jpg';
import ReportFineCard from "./report-fine-card";

function AccountPage() {
    const [accountOption, setAccountOption] = useState("account-post");
    const handleAccountOptionChange = (e)=>{
        if(e.target.id == 'account-post'){
          setAccountOption('account-post');
        }
        else if(e.target.id == 'account-bank'){
          setAccountOption('account-bank');
        }
        else if(e.target.id == 'account-reports'){
          setAccountOption('account-reports');
        }
      }
    
      const acountOptionsRender = (option)=>{
        if(option == 'account-post'){
          return(
            <>
              <div className="account-posts">
                {/* Map the users posts here */}
              </div>
            </>
          )
        }
        else if(option == 'account-bank'){
          return(
            <>
                <h3>Total Amount: $0</h3>
                {/*Jawad will implement pay pal window here */}
            </>
          )
        }
        else if(option == 'account-reports'){
          return(
            <div className="account-option-render">
                <h2>Warnings</h2>
                <ul>
                  <li>s</li>
                  {/* Map all warnings as a <li> element */}
                </ul>
                <h2>Fines</h2>
                {/* Mapp all fine cards */}
                <ReportFineCard />
            </div>
          )
        }
      }
  
  return (
    <div className="account-page">
          {/*Top section of account */}
          <div className="account-header">
            <img className="account-pfp-container" src={biden_pfp}/>
            {/* Follow Information and Bio */}
            <div className="account-info">
              <div className="account-follow">
                <div className="follow-button-post">Follow</div>
                <h3>Followers: 0</h3>
                <h3>Following: 0</h3>
              </div>
              {/* Bio */}
              <h3>djsahfklasdfhjkdshhasdkfhhfjkdsa</h3>
            </div>
          </div>

          <div className="account-options">
            <h3 className="account-option" id="account-post" onClick={handleAccountOptionChange}>Posts</h3>
            <h3 className="account-option" id="account-bank" onClick={handleAccountOptionChange}>Bank Info</h3>
            <h3 className="account-option" id="account-reports" onClick={handleAccountOptionChange}>Reports</h3>
          </div>
          {acountOptionsRender(accountOption)}
    </div>  
  );
}

export default AccountPage;

