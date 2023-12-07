//hooks
import { useState } from "react";
import { useCookies } from 'react-cookie';

//assets
import '../static/css/post-card.css';
import brokenHeart from '../static/images/broken-heart.png';

//components
import FollowCtrl from './FollowCtrl';
import LikeCtrl from './LikeCtrl';
import DislikeCtrl from './DislikeCtrl';
import CommentCtrl from './CommentCtrl';
import TipCtrl from "./TipCtrl";

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
                    <h3>{props.postContent["text"]}</h3>
                </div>
                <div className='card-header'>
                    {cookies["loggedIn"] ? <FollowCtrl info={props.info["following"]} 
                                                       target={props.postContent["author"]} 
                                                       whichCookies={props.whichCookies}
                                                       triggerGetUserInfo={props.triggerGetUserInfo}/> : null}
                    {cookies["loggedIn"] ? <div className='follow-button-post'>Block</div> : null}
                    <div className='follow-button-post'>Report</div>
                    {cookies["loggedIn"] ? <TipCtrl target={props.postContent['author']}
                                                    whichCookies={props.whichCookies}
                                                    triggerGetUserInfo={props.triggerGetUserInfo}/> : null}
                    <div>Views: {props.postContent["views"]}</div>
                    <div>Date: {props.postContent["time_posted"]}</div>
                </div>
            </div>
            <CommentCtrl parent={props.postContent['id']} 
                         whichCookies={props.whichCookies}/>
        </>
    );
}

export default ViewCard;