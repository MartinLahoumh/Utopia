
//hooks
import { useState, useEffect } from "react";

//methods
import dbTop3Posts from "../db methods/dbTop3Posts";
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//components
import Top3PostsHTML from "../presentations/Top3PostsHTML";

//copy paste of foryou

function Top3PostsCtrl(props) {

    //state that contains post ids
    const [posts, setPosts] = useState([]);
    //state that contains info for each post
    const [postsInfo, setPostsInfo] = useState([]);
    //state that contains user infos for the users of the post
    const [usersInfo, setUsersInfo] = useState([]);

    //state that triggers getting post infos
    const [requestGetPostInfo, setRequestGetPostInfo] = useState(false);

    //RETRIEVING INITIAL POSTS IDS ==============================================================================

    //effect hook that populates the posts with post ids AT THE START
    useEffect(() => {
        async function handleGetTrendingPosts() {
            if (props.requestGetTrendingPosts) {
                //determine whether to use logged in or anon cookies
                const [uid, key] = props.whichCookies();

                try {
                    //before is null in order to get the starting 10
                    const [posts, error] = await dbTop3Posts(uid, key);

                    //console.log("posts", posts);
                    setPosts(posts);

                    //now, convert post ids to info by triggering the other effect hook
                    triggerGetPostInfo();
                } catch (error) {
                    console.log(error);
                } finally {
                    props.setRequestGetTrendingPosts(false);
                }
            }
        }
        handleGetTrendingPosts();
    }, [props.requestGetTrendingPosts]);

    //WHEN TO TRIGGER GETTING INITIAL POSTS ==============================================================================

    //effect hook that triggers getting posts on component refresh (switching tabs or refreshing page)
    useEffect(() => {
        props.triggerGetTrendingPosts();
    }, [])

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
            <Top3PostsHTML info={props.info}
                postsInfo={postsInfo} usersInfo={usersInfo}
                whichCookies={props.whichCookies}
                triggerGetUserInfo={props.triggerGetUserInfo}
                triggerGetPostInfo={props.triggerGetPostInfo} />
        </>
    )
}

export default Top3PostsCtrl;