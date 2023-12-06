//components
import JobsHTML from "../presentations/JobsHTML";

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { dbGetPosts, dbGetPostInfo, dbGetUserInfo } from "../db methods/dbGetPosts";


function JobsCtrl(props) {
 
    const [cookies] = useCookies();

    // State for posts pagination
    const [before, setBefore] = useState(null);

    // States for post data
    const [posts, setPosts] = useState([]);
    const [postsInfo, setPostsInfo] = useState([]);
    const [usersInfo, setUsersInfo] = useState([]);

    // States for controlling data fetching
    const [requestGetInitialJobs, setRequestGetInitialJobs] = useState(false);
    const [requestGetJobInfo, setRequestGetJobInfo] = useState(false);

    // Effect for retrieving initial job posts
    useEffect(() => {
        async function handleGetInitialJobs() {
            if (requestGetInitialJobs) {
                const [uid, key] = props.whichCookies();

                try {
                    const [jobPosts, beforeResult, error] = await dbGetPosts(uid, key, 10, null, ["JOB"]);
                    
                    setBefore(beforeResult);
                    setPosts(jobPosts);
                    setRequestGetJobInfo(true);
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestGetInitialJobs(false);
                }
            }
        }
        handleGetInitialJobs();
    }, [requestGetInitialJobs, props.whichCookies]);

    // Triggering the initial jobs fetching
    useEffect(() => {
        setRequestGetInitialJobs(true);
    }, []);

    // Function to trigger getting jobs manually
    function triggerGetInitialJobs() {
        setRequestGetInitialJobs(true);
    }

    // Effect for getting job posts information
    useEffect(() => {
        async function handleGetJobsInfo() {
            if (requestGetJobInfo) {
                const [uid, key] = props.whichCookies();

                try {
                    let newPostsInfo = [];
                    let newUsersInfo = [];

                    for (const jobId of posts) {
                        const jobInfo = await dbGetPostInfo(uid, key, jobId);
                        newPostsInfo.push(jobInfo);

                        const userInfo = await dbGetUserInfo(uid, key, jobInfo[0]['author']);
                        newUsersInfo.push(userInfo);
                    }

                    setPostsInfo(newPostsInfo);
                    setUsersInfo(newUsersInfo);
                } catch (error) {
                    console.log(error);
                } finally {   //honestly this after this part i used chatgpt so i can go to sleep 
                    setRequestGetJobInfo(false);
                }
            }
        }
        handleGetJobsInfo();
    }, [requestGetJobInfo, posts, props.whichCookies]);

    return (
        <JobsHTML
            info={props.info}
            triggerGetInitialJobs={triggerGetInitialJobs}
            postsInfo={postsInfo}
            usersInfo={usersInfo}
            whichCookies={props.whichCookies}
            triggerGetUserInfo={props.triggerGetUserInfo}
        />
    );
}

export default JobsCtrl;
