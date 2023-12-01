import '../static/css/post-card.css';
import '../static/css/profile-view-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";

const ProfileCard = (props)=> {
  return (
    <>
        <div style={{width: '70%'}}className='card'>
            <div className='card-header profile-card-header' style={{borderBottomStyle:'none'}}>
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    <h4 className='card-author'>{props.author}</h4>
                </div>
                <div className='follow-button-post' style={{paddingLeft:"10px", paddingRight:"10px"}}>Follow</div>
            </div>
        </div>
    </>
  );
}

export default ProfileCard;