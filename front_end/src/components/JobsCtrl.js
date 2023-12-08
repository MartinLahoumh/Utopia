//components
import JobsHTML from "../presentations/JobsHTML";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { ShowJobs } from '../db methods/dbGetJobs';
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

function JobsCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();
    //state that contains post ids
    const [jobIds, setJobIds] = useState([]);
    const [requestGetInitialJobs, setRequestGetInitialJobs] = useState(false);
    const [requestGetJobInfo, setRequestGetJobInfo] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [usersInfo, setUsersInfo] = useState([]);

    useEffect(() => {
        async function handleGetInitialJobs() {
            if (requestGetInitialJobs) {
                //determine whether to use logged in or anon cookies
                const [uid, key] = props.whichCookies();

                try {
                    //before is null in order to get the starting 10
                    const [jobIds, error] = await ShowJobs(uid, key);

                    console.log("jobIds: ", jobIds);
                    console.log(error);
                    setJobIds(jobIds);

                    //now, convert post ids to info by triggering the other effect hook
                    triggerGetPostInfo();
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestGetInitialJobs(false);
                }
            }
        }
        handleGetInitialJobs();
    }, [requestGetInitialJobs]);

    useEffect(() => {
        setRequestGetInitialJobs(true);
    }, [])
    
    function triggerGetInitialJobs() {
        setRequestGetInitialJobs(true);
    }

    useEffect(() => {
        async function handleGetJobInfo() {
            if (requestGetJobInfo) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //build new infos (new state value)
                    let newJobInfo = [];
                    let newUsersInfo = [];

                    //iterate through each postid
                    console.log("JOB IDS IN SEARCH: ", jobIds);
                    for (const jobId of jobIds) {
                        //retrieve postinfo
                        const job = await dbGetPostInfo(uid, key, jobId);
                        console.log("CHECK: ", job[0]['keywords']);
                        newJobInfo.push(job[0]['keywords']);
                        console.log(job);
                        //console.log("postinfoauthor", postInfo[0]['author']);

                        //from the postinfo results, retrieve userinfo
                        const userInfo = await dbGetUserInfo(uid, key, job[0]['author']);
                        newUsersInfo.push(userInfo);

                        //console.log(postInfo, userInfo);
                    }
                    setJobs(newJobInfo);
                    setUsersInfo(newUsersInfo);
                    //console.log("JOBS: ", jobs);
                } catch (error) {
                    console.log(error)
                } finally {
                    console.log("JOBS: ", jobs);
                    //console.log("usersinfo", usersInfo);
                    setRequestGetJobInfo(false);
                }
            }
        }
        handleGetJobInfo();
    }, [requestGetJobInfo])

    function triggerGetPostInfo() {
        setRequestGetJobInfo(true);
    }

    console.log("jobs", jobs);

    return (
        <>
            <JobsHTML jobs={jobs}/>
        </>
    )
}

export default JobsCtrl;