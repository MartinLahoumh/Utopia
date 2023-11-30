import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";

const ProfileCard = (props)=> {
  return (
    <>
        <div style={{width: '70%'}}className='card'>
            <div className='card-header' style={{borderBottomStyle:'none'}}>
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    <h4 className='card-author'>{props.author}</h4>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent:'end'}}className='follow-container'>
                    <button className='main-button follow-button'>Follow</button>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProfileCard;