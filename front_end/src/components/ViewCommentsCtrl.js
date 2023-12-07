//hooks
import { useState, useEffect } from "react";

//methods
import { dbGetComments } from "../db methods/dbGetComments";
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//components
import ViewCommentsHTML from "../presentations/ViewCommentsHTML";

function ViewCommentsCtrl(props) {

    //state that is used for posts pagination
    const [before, setBefore] = useState(null);
    //state that contains comment ids
    const [comments, setComments] = useState([]);
    //state that contains info for each comment
    const [commentsInfo, setCommentsInfo] = useState([]);
    //state that contains user infos for the users of the comment
    const [usersInfo, setUsersInfo] = useState([]);

    //state that triggers getting comment infos
    const [requestGetCommentInfo, setRequestGetCommentInfo] = useState(false);
    //state that triggers getting post infos

    console.log(props.requestGetInitialComments);
    //RETRIEVING INITIAL POSTS IDS ==============================================================================

    //effect hook that populates the posts with post ids AT THE START
    useEffect(() => {
        async function handleGetInitialComments() {
            if (props.requestGetInitialComments) {
                //determine whether to use logged in or anon cookies
                const [uid, key] = props.whichCookies();

                try {
                    console.log("parent", props.parent);
                    //before is null in order to get the starting 10
                    const [comments, beforeResult, error] = await dbGetComments(uid, key, 10, null, props.parent);

                    console.log("comments", comments);
                    console.log("error", error);
                    setBefore(beforeResult); //prep the before state for when we need to go to the next page
                    setComments(comments);

                    //now, convert post ids to info by triggering the other effect hook
                    triggerGetCommentInfo();
                } catch (error) {
                    console.log(error);
                } finally {
                    props.setRequestGetInitialComments(false);
                }
            }
        }
        handleGetInitialComments();
    }, [props.requestGetInitialComments]);

    //WHEN TO TRIGGER GETTING INITIAL COMMENTS ==============================================================================

    //effect hook that triggers getting comments on component refresh (switching tabs or refreshing page)
    useEffect(() => {
        props.triggerGetInitialComments();
    }, [])

    //TURNING COMMENT IDS INTO INFO ==============================================================================

    //effect hook that populates the commentsinfo with comment infos AND populates usersInfo
    useEffect(() => {
        async function handleGetCommentsInfo() {
            if (requestGetCommentInfo) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //build new infos (new state value)
                    let newCommentsInfo = [];
                    let newUsersInfo = [];

                    //iterate through each postid
                    for (const commentid of comments) {
                        //retrieve postinfo
                        const commentInfo = await dbGetPostInfo(uid, key, commentid);
                        newCommentsInfo.push(commentInfo);

                        //console.log("postinfoauthor", postInfo[0]['author']);

                        //from the postinfo results, retrieve userinfo
                        const userInfo = await dbGetUserInfo(uid, key, commentInfo[0]['author']);
                        newUsersInfo.push(userInfo);

                        //console.log(postInfo, userInfo);
                    }
                    setCommentsInfo(newCommentsInfo);
                    setUsersInfo(newUsersInfo);
                } catch (error) {
                    console.log(error)
                } finally {
                    //console.log("postsinfo", postsInfo);
                    //console.log("usersinfo", usersInfo);
                    setRequestGetCommentInfo(false);
                }
            }
        }
        handleGetCommentsInfo();
    }, [requestGetCommentInfo])

    //WHEN TO TRIGGER GETTING POST INFO ==============================================================================

    //function that  triggers getting post info (for manual refresh)
    function triggerGetCommentInfo() {
        setRequestGetCommentInfo(true);
    }



    return (
        <>
            <ViewCommentsHTML commentsInfo={commentsInfo} usersInfo={usersInfo}/>
        </>
    );
}

export default ViewCommentsCtrl;