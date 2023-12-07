//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import { dbGetPosts } from "../db methods/dbGetPosts";
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";

//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//components
import ForYouHTML from "../presentations/ForYouHTML";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

function ForYouCtrl(props) {
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
                    const [posts, beforeResult, error] = await dbGetPosts(uid, key, 10, null, ["POST"]);

                    //console.log("posts", posts);
                    setBefore(beforeResult); //prep the before state for when we need to go to the next page
                    setPosts(posts);

                    //now, convert post ids to info by triggering the other effect hook
                    setRequestGetPostInfo(true);
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

                        //from the postinfo results, retrieve userinfo
                        const userInfo = await dbGetUserInfo(uid, key, postInfo['author']);
                        newUsersInfo.push(userInfo);

                        //console.log(postInfo, userInfo);
                    }
                    setPostsInfo(newPostsInfo);
                    setUsersInfo(newUsersInfo);
                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestGetPostInfo(false);
                }
            }
        }
        handleGetPostsInfo();
    }, [requestGetPostInfo])

    //These are all temp values. In reality, this wont be filled up like this, you fill it up from back end. This stores all our posts
    const [tempPosts, setTempPosts] = useState([{
        "pfp": biden_pfp,
        "author": "Jo Biden",
        "date": "July 4, 2023",
        "body": "I am the president yo",
        "likes": "50",
        "reposts": "60",
        "tags": ["President", "America", "USA"]
    }, {
        "pfp": kojima_pfp,
        "author": "Hideo Kojima",
        "date": "July 4, 2023",
        "body": "Hey, have you played metal gear? Do you know what metal gear is? Let me know if you played it ok? Yes? metal gear.",
        "likes": "50",
        "reposts": "60",
        "tags": ["President", "America", "USA"]
    }, {
        "pfp": mario_pfp,
        "author": "Mario",
        "date": "July 4, 2023",
        "body": "Elaphant",
        "likes": "50",
        "reposts": "60",
        "tags": ["President", "America", "USA"]
    }, {
        "pfp": mario_pfp,
        "author": "Mario",
        "date": "July 4, 2023",
        "body": "Elaphant",
        "likes": "50",
        "reposts": "60",
        "tags": ["President", "America", "USA"]
    }, {
        "pfp": mario_pfp,
        "author": "Mario",
        "date": "July 4, 2023",
        "body": "Elaphant",
        "likes": "50",
        "reposts": "60",
        "tags": ["President", "America", "USA"]
    }])

    return (
        <>
            <ForYouHTML info={props.info} triggerGetInitialPosts={triggerGetInitialPosts}
                postsInfo={postsInfo} usersInfo={usersInfo} />
        </>
    )
}

export default ForYouCtrl;