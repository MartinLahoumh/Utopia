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
            document.getElementById('browse-wrapper').style = " margin-top:40px; transition: 0.3s;";
            
        }
        else if(open == true){
            setOpen(false);
            document.getElementById('browse-wrapper').style = "margin-top:855px; transition: 0.3s;";
        }
    }

    const containerOpen = (e)=>{
        console.log(e)
        if(e.target.id == 'suggested'){
            document.getElementById('suggested-container').style = " height: 80vh; transition:0.3s;";
            document.getElementById('trending-container').style = " height: 5vh; transition:0.3s;";
            document.getElementById('jobs-container').style = " height: 5vh; transition:0.3s;";
            document.querySelectorAll('.spcSuggested')[0].style.height = '80vh';
            document.querySelectorAll('.spcTrending')[0].style.height = '5vh';
            document.querySelectorAll('.spcJobs')[0].style.height = '5vh';
        }
        else if(e.target.id == 'trending'){
            document.getElementById('suggested-container').style = " height: 5vh; transition:0.3s;";
            document.getElementById('trending-container').style = " height: 80vh; transition:0.3s;";
            document.getElementById('jobs-container').style = " height: 5vh; transition:0.3s;";
            document.getElementsByClassName('spcJobs').style = "overflow-y: hidden;"
            document.getElementsByClassName('spcTrending').style = "overflow-y: scroll;"
            document.getElementsByClassName('spcSuggested').style = "overflow-y: hidden;"
            document.querySelectorAll('.spcSuggested')[0].style.height = '5vh';
            document.querySelectorAll('.spcTrending')[0].style.height = '80vh';
            document.querySelectorAll('.spcJobs')[0].style.height = '5vh';
            
        }
        else if(e.target.id == 'jobs'){
            document.getElementById('suggested-container').style = " height: 5vh; transition:0.3s;";
            document.getElementById('trending-container').style = " height: 5vh; transition:0.3s;";
            document.getElementById('jobs-container').style = " height: 80vh; transition:0.3s;";
            document.getElementsByClassName('spcJobs').style = "overflow-y: auto;"
            document.getElementsByClassName('spcTrending').style = "overflow-y: hidden;"
            document.getElementsByClassName('spcSuggested').style = "overflow-y: hidden;"
            document.querySelectorAll('.spcSuggested')[0].style.height = '5vh';
            document.querySelectorAll('.spcTrending')[0].style.height = '5vh';
            document.querySelectorAll('.spcJobs')[0].style.height = '80vh';
        }
    }
    //Recieve the info from props CONTINUE HERE!!!
  return (
    <div className='browse-wrapper' id='browse-wrapper'>  
        <div className='browse-container-comp'>
                <div style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={browseOpen}>
                <h1 className='browse-title'>Browse</h1>
                </div>
                
                <div onClick={containerOpen} className='sub-container suggested' id='suggested-container'>
                    <div style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} id='suggested'>
                        <h2 className='browse-title'>Suggested</h2>
                    </div>
                    <div className='suggested-profile-container spcSuggested' id='suggested'>
                        {/*Insert profile cards here */}
                        <ProfileCard  />
                        <ProfileCard  />
                        <ProfileCard  />
                        <ProfileCard  />
                    </div>
                </div>
            <div onClick={containerOpen}className='sub-container trending' id='trending-container'>
            <div style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} id='trending'>
                        <h2 className='browse-title'>Trending Users</h2>
                    </div>
                <div className='suggested-profile-container spcTrending' id='trending'>
                    {/*Insert profile cards here */}
                    <ProfileCard  />
                    <ProfileCard  />
                    <ProfileCard  />
                    <ProfileCard  />
                </div>
            </div>
            <div onClick={containerOpen}className='sub-container jobs' id='jobs-container'>
            <div style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} id='jobs'>
                        <h2 className='browse-title'>Job Listings</h2>
            </div>
            <div className='suggested-profile-container spcJobs' id='jobs'>
                    {/*Insert profile cards here */}
                    <ProfileCard  />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Browse;