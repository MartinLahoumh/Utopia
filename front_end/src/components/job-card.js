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
                <img className='card-pfp-img job-logo' src={props.pfp}/>
                <h4 className='job-position-title'>Tesla</h4>
            </div>
            <div style={{backgroundColor: props.color}} className='card-body job-card-body'>
                <ul>
                    {/* Make these a map from the actual req, not hard coded and all that */}
                    <li>
                        Work well with others
                    </li>
                    <li>
                        Good Work Ethic
                    </li>
                </ul>
                <button className='main-button'>Apply</button>
            </div>
        </div>
    </>
  );
}

export default JobCard;