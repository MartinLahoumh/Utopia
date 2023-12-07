import '../static/css/post-card.css';
import brokenHeart from '../static/images/broken-heart.png';
import biden from '../static/images/biden-pfp.jpg';
import { useState } from "react";
import { useCookies } from 'react-cookie';
import FollowCtrl from './FollowCtrl';
import LikeCtrl from './LikeCtrl';
import DislikeCtrl from './DislikeCtrl';

const Comments = (comment, setComment) => {
    if (comment) {
        return (
            <>
                <div className='comment-button-open'>
                    <div className='user-comment-container'>
                        <textarea className='user-comment' type='text' placeholder="Add Comment"></textarea>
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
                <button onClick={() => { console.log("CLICK!"); setComment(false); }} className='comment-button'>
                    ^
                </button>
            </>
        )
    }
    return (
        <button onClick={() => { console.log("CLICK!"); setComment(true); }} className='comment-button'>
            V
        </button>
    )
}

const ViewCard = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies();

    let [commentClick, setCommentClick] = useState(false);
    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <img className='card-pfp-img' src={props.userContent["avatar"]} />
                    <div className='card-author-container'>
                        <h4 className='card-author'>{props.userContent["username"]}</h4>
                    </div>
                    <div className="tags">
                        {props.postContent["keywords"].map((tag) => (
                            <div className="tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                    {/* the likes button */}
                    {cookies['loggedIn'] ? <LikeCtrl info={props.info['liked_posts']}
                                                     target={props.postContent['id']}
                                                     author={props.postContent['author']}
                                                     whichCookies={props.whichCookies}
                                                     triggerGetUserInfo={props.triggerGetUserInfo}
                                                     triggerGetPostInfo={props.triggerGetPostInfo}/> : null}
                    {/* label that only shows up for surfers */}
                    {cookies['loggedIn'] ? "" : "Likes: "}
                    <p className="like-count">{props.postContent["likes"]}</p>
                    {/* the dislikes button */}
                    {cookies['loggedIn'] ? <DislikeCtrl info={props.info['disliked_posts']}
                                                     target={props.postContent['id']}
                                                     author={props.postContent['author']}
                                                     whichCookies={props.whichCookies}
                                                     triggerGetUserInfo={props.triggerGetUserInfo}
                                                     triggerGetPostInfo={props.triggerGetPostInfo}/> : null}
                    {/* label that only shows up for surfers */}
                    {cookies['loggedIn'] ? "" : "_Dislikes: "}
                    <p className="like-count">{props.postContent["dislikes"]}</p>

                </div>
                <div style={{ backgroundColor: props.color }} className='card-body'>
                    {/*<h3>{props.body}</h3>*/}
                    {props.images[0] != null?
                    <div  className='imgs-container'>
                        <div style={{width:"20%", margin:"0"}} className='ad-container '>
                            <img className='ad' src={"http://127.0.0.1:5000"+props.images[0]}/>
                        </div>
                        {props.images[1] != null?
                        <div style={{width:"20%", margin:"0"}} className='ad-container '>
                            <img className='ad' src={"http://127.0.0.1:5000"+props.images[1]}/>
                        </div>:null}
                    </div>
                    :null}
                    <h3>{props.postContent["text"]}</h3>
                </div>
                <div className='card-header'>
                    {cookies["loggedIn"] ? <FollowCtrl info={props.info["following"]} 
                                                       target={props.postContent["author"]} 
                                                       whichCookies={props.whichCookies}
                                                       triggerGetUserInfo={props.triggerGetUserInfo}/> : null}
                    {cookies["loggedIn"] ? <div className='follow-button-post'>Block</div> : null}
                    <div className='follow-button-post'>Report</div>
                    {cookies["loggedIn"] ? <div className='follow-button-post'>Tip</div> : null}
                    <div>Views: {props.postContent["views"]}</div>
                    <div>Date: {props.postContent["time_posted"]}</div>
                </div>
            </div>
            {Comments(commentClick, setCommentClick)}
        </>
    );
}

export default ViewCard;