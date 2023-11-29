import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";

const ProfileCard = (props)=> {
  return (
    <>
        <div className='card'>
            <div className='card-header'>
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    <h4 className='card-author'>{props.author}</h4>
                </div>
            </div>
            <div style={{backgroundColor: props.color}} className='card-body card-bio'>
                <h3>{props.body}</h3>
            </div>
        </div>
    </>
  );
}

export default ProfileCard;