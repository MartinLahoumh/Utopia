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
            //document.getElementById('browse-container-comp').style = " margin-top:40px; transition: 0.3s;";
            
        }
        else if(open == true){
            setOpen(false);
            //document.getElementById('browse-container-comp').style = "margin-top:225px; transition: 0.3s;";
        }
    }

    const isOpen = (open)=>{
        if(open == false){
            return(
                <>
                    <div className='sub-container' style={{backgroundColor:'#ffff0055', borderBottomStyle:'solid', borderBottomColor:'black', borderBottomWidth:'5px',borderTopStyle:'solid', borderTopColor:'black', borderTopWidth:'5px'}}>
                    <h2>Suggested</h2>
                    <div className='item-container'>
                        {/*Change to be a map where we have an array that stores all suggested users. Make it a prop as well */}
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
                    </div>
                </div>
                <div className='sub-container' style={{backgroundColor:'#fa000055'}}>
                    <h2>Trending Topics</h2>
                    <div className='item-container'>
                        <ul>
                            {/*Change to be a prop */}
                            {trendingTopics.map((topic) =>(
                                <>
                                <li>{topic}</li>
                                <br/>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
                </>
            )
        }
        else if(open == true){
            return(<></>)
        }
    }
    /* These are temp values. You will need to  GET the topics from backend and fill it out*/
    const trendingTopics = ['mario', 'biden', 'trump', 'game', '2024'] 
  return (  
        <div className='browse-container-comp' id='browse-container-comp'>
                <div className='browse-title-container' style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={browseOpen}>
                <h1 className='browse-title'>Browse</h1>
                </div>
                {isOpen(open)}
        </div>
  );
}

export default Browse;