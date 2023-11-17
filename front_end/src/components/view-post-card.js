import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
import { useState } from "react";

const Comments = (comment, setComment)=>{
    if(comment){
        return(
            <>
                <div className='comment-button-open'>
                    <div className='user-comment-container'>
                        <textarea className='user-comment'type='text' placeholder="Add Comment"></textarea>
                    </div>
                    <div className='comments'>
                        <img className='card-pfp-img comment-pfp-img'></img>
                        <h5 className='comment-body'>What is going on in this image?</h5>
                    </div>
                    <div className='comments'>
                        <img className='card-pfp-img comment-pfp-img'></img>
                        <h5 className='comment-body'>What is going on in this image?</h5>
                    </div>
                    <div className='comments'>
                        <img className='card-pfp-img comment-pfp-img'></img>
                        <h5 className='comment-body'>What is going on in this image?</h5>
                    </div>
                </div>
                <div onClick={()=>{console.log("CLICK!");setComment(false);}} className='comment-button'>
                    ^
                </div>
            </>
        )
    }
    return(
        <div onClick={()=>{console.log("CLICK!");setComment(true);}} className='comment-button'>
            V
        </div>
    )
}

const ViewCard = (props)=> {
    let [commentClick, setCommentClick] = useState(false);
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
        {Comments(commentClick, setCommentClick)}
    </>
  );
}

export default ViewCard;