import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";

const Comments = (comment)=>{
    if(comment){
        return(
            <div className='comment-button'>
                <div className='user-comment-container'>
                    <input className='user-comment'type='text' placeholder="Add Comment"></input>
                </div>
                <div className='comments'>
                    <img className='card-pfp-img comment-pfp-img'></img>
                    <h5 className='comment-body'></h5>
                </div>
            </div>
        )
    }
    return(
        <>
            FALSE
        </>
    )
}

const ViewCard = (props)=> {
    let [commentClick, setCommentClick] = useState(true);
  return (
    <>
        <div className='card'>
            <div className='card-header'>
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    <h4 className='card-author'>{props.author}</h4>
                </div>
                <div className="tags">
                    {props.tags.map((tag) =>(
                        <div className="tag">
                            {tag}
                        </div>
                    ))}
                </div>
                <img className="card-pfp-img likes" src={heart}/>
                <p className="like-count">{props.likes}</p>
                <img className="card-pfp-img likes" src={heart}/>
                <p className="like-count">{props.likes}</p>
                
            </div>
            <div style={{backgroundColor: props.color}} className='card-body'>
                <h3>{props.body}</h3>
            </div>
        </div>
        {Comments(commentClick)}
    </>
  );
}

export default ViewCard;