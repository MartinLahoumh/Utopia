//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import { dbGetTrendingPosts } from "../db methods/dbGetTrendingPosts";
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//components
import TrendingPostHTML from "../presentations/TrendingPostHTML";

function TrendingPostCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //state that is used for posts pagination
    const [before, setBefore] = useState(null);
    //state that contains post ids
    const [posts, setPosts] = useState([]);
    //state that contains info for each post
    const [postsInfo, setPostsInfo] = useState([]);
    //state that contains user infos for the users of the post
    const [usersInfo, setUsersInfo] = useState([]);

    //state that triggers getting posts
    const [requestGetInitialPosts, setRequestGetInitialPosts] = useState(false);
    //state that triggers getting post infos
    const [requestGetPostInfo, setRequestGetPostInfo] = useState(false);

    //RETRIEVING INITIAL POSTS IDS ==============================================================================

    //effect hook that populates the posts with post ids AT THE START
    useEffect(() => {
        async function handleGetInitialPosts() {
            if (requestGetInitialPosts) {
                //determine whether to use logged in or anon cookies
                const [uid, key] = props.whichCookies();

                try {
                    //before is null in order to get the starting 10
                    //no pagination on this
                    const [posts, beforeResult, error] = await dbGetTrendingPosts(uid, key, 10);

                    console.log("posts", posts);
                    setBefore(beforeResult); //prep the before state for when we need to go to the next page
                    setPosts(posts);

                    //now, convert post ids to info by triggering the other effect hook
                    triggerGetPostInfo();
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestGetInitialPosts(false);
                }
            }
        }
        handleGetInitialPosts();
    }, [requestGetInitialPosts]);

    //WHEN TO TRIGGER GETTING INITIAL POSTS ==============================================================================

    //effect hook that triggers getting posts on component refresh (switching tabs or refreshing page)
    useEffect(() => {
        setRequestGetInitialPosts(true);
    }, [])

    //function that also triggers getting posts (for manual refresh)
    function triggerGetInitialPosts() {
        setRequestGetInitialPosts(true);
    }

    //TURNING POST IDS INTO INFO ==============================================================================

    //effect hook that populates the postsinfo with post infos AND populates usersInfo
    useEffect(() => {
        async function handleGetPostsInfo() {
            if (requestGetPostInfo) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //build new infos (new state value)
                    let newPostsInfo = [];
                    let newUsersInfo = [];

                    //iterate through each postid
                    for (const postid of posts) {
                        //retrieve postinfo
                        const postInfo = await dbGetPostInfo(uid, key, postid);
                        newPostsInfo.push(postInfo);

                        //console.log("postinfoauthor", postInfo[0]['author']);

                        //from the postinfo results, retrieve userinfo
                        const userInfo = await dbGetUserInfo(uid, key, postInfo[0]['author']);
                        newUsersInfo.push(userInfo);

                        //console.log(postInfo, userInfo);
                    }
                    setPostsInfo(newPostsInfo);
                    setUsersInfo(newUsersInfo);
                } catch (error) {
                    console.log(error)
                } finally {
                    //console.log("postsinfo", postsInfo);
                    //console.log("usersinfo", usersInfo);
                    setRequestGetPostInfo(false);
                }
            }
        }
        handleGetPostsInfo();
    }, [requestGetPostInfo])

    //WHEN TO TRIGGER GETTING POST INFO ==============================================================================

    //function that  triggers getting post info (for manual refresh)
    function triggerGetPostInfo() {
        setRequestGetPostInfo(true);
    }


    return (
        <>
            <TrendingPostHTML info={props.info} triggerGetInitialPosts={triggerGetInitialPosts}
                postsInfo={postsInfo} usersInfo={usersInfo} 
                whichCookies={props.whichCookies}
                triggerGetUserInfo={props.triggerGetUserInfo}
                triggerGetPostInfo={triggerGetPostInfo}/>
        </>
    )
}

export default TrendingPostCtrl;