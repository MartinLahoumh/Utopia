import '../static/css/post-card.css';
import '../static/css/job-card.css';
import heart from '../static/images/heart.png';
import brokenHeart from '../static/images/broken-heart.png';
import { useState } from "react";

const JobCard = (props)=> {
  return (
    <>
        <div className='card job-card'>
            <div className='card-header job-card-header'>
                <img className='card-pfp-img job-logo' src={props.jobIcon}/>
                <h4 className='job-position-title'>{props.position}</h4>
            </div>
            <div style={{backgroundColor: props.color}} className='card-body job-card-body'>
                <ul>
                    <li>{props.req1}</li>
                    <li>{props.req2}</li>
                </ul>
                <button className='main-button'>Apply</button>
            </div>
        </div>
    </>
  );
}

export default JobCard;