import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";
import ProfileCard from './profile-view-card';
import '../static/css/browse.css';
const Browse = (props)=> {
    let [open, setOpen] = useState(false);
    const browseOpen = (e)=>{
        console.log(e.target.id);
        if(open == false){
            setOpen(true);
            document.getElementById('browse-wrapper').style = "margin-left:4%; transition: 0.3s;";
            
        }
        else if(open == true){
            setOpen(false);
            document.getElementById('browse-wrapper').style = "margin-left:71%; transition: 0.3s;";
        }
    }
    //Recieve the info from props CONTINUE HERE!!!
  return (
    <div className='browse-wrapper' id='browse-wrapper'>  
        <button onClick={browseOpen} className='browse-button' id='browse-button'>
                
        </button>
        <div className='browse-container-comp'>
                <h1>Browse</h1>
                <div className='sub-container suggested'>
                    <h3>Suggested</h3>
                    <div className='comment-button-open suggested-profile-container'>
                        {/*Insert profile cards here */}
                        <ProfileCard  />
                        <ProfileCard  />
                        <ProfileCard  />
                        <ProfileCard  />
                    </div>
                </div>
            <div className='sub-container trending'>
                <h3>Trending Users</h3>
                <div className='comment-button-open suggested-profile-container'>
                    {/*Insert profile cards here */}
                    <ProfileCard  />
                    <ProfileCard  />
                    <ProfileCard  />
                    <ProfileCard  />
                </div>
            </div>
            <div className='sub-container jobs'>
                <h3>Job Listings</h3>
                {/*Insert Job cards here */}
                <ProfileCard  />
                <ProfileCard  />
            </div>
        </div>
    </div>
  );
}

export default Browse;