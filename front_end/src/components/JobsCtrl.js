import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import { dbGetPosts } from "../db methods/dbGetPosts";
import { dbGetPostInfo } from "../db methods/dbGetPostInfo";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//components
import JobsHTML from "../presentations/JobsHTML";

// Mock job listings
const mockJobListings = [
    {
        id: 1,
        title: "Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        description: "Seeking a skilled software engineer with 5 years of experience in web development."
    },
    {
        id: 2,
        title: "Graphic Designer",
        company: "Creative Studio",
        location: "New York, NY",
        description: "Looking for a creative graphic designer proficient in Adobe Suite and with a great portfolio."
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Data Inc.",
        location: "Austin, TX",
        description: "Data analyst needed to analyze large datasets and provide insights. SQL and Python skills required."
    },
    // ...add more listings as needed
];

function JobsCtrl({ info, triggerGetUserInfo, whichCookies }) {
    const [cookies] = useCookies();

    // State for controlling data fetching
    const [requestGetInitialJobs, setRequestGetInitialJobs] = useState(false);
    const [requestGetJobInfo, setRequestGetJobInfo] = useState(false);

    // States for post data
    const [posts, setPosts] = useState([]);
    const [postsInfo, setPostsInfo] = useState([]);
    const [usersInfo, setUsersInfo] = useState([]);

    // State to store job listings
    const [jobListings, setJobListings] = useState([]);

    // Function to trigger getting initial jobs
    function triggerGetInitialJobs() {
        setRequestGetInitialJobs(true);
    }

    // Effect for retrieving initial job posts
    useEffect(() => {
        async function handleGetInitialJobs() {
            if (requestGetInitialJobs) {
                const uid = cookies.uid;
                const key = cookies.key;

                try {
                    const [jobPosts, beforeResult] = await dbGetPosts(uid, key, 10, null, ["JOB"]);
                    
                    setPosts(jobPosts);
                    setRequestGetJobInfo(true);
                } catch (error) {
                    console.error(error); 
                } finally {
                    setRequestGetInitialJobs(false);
                }
            }
        }
        handleGetInitialJobs();
    }, [requestGetInitialJobs, cookies, whichCookies]);

    // Effect for getting job posts information
    useEffect(() => {
        async function handleGetJobsInfo() {
            if (requestGetJobInfo) {
                const uid = cookies.uid;
                const key = cookies.key;

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
                    console.error(error);
                } finally {
                    setRequestGetJobInfo(false);
                }
            }
        }
        handleGetJobsInfo();
    }, [requestGetJobInfo, posts, cookies, whichCookies]);

    // Simulate fetching job listings
    useEffect(() => {
        setJobListings(mockJobListings);
    }, []);

    return (
        <JobsHTML
            info={info}
            jobListings={jobListings} // Pass job listings to JobsHTML
            triggerGetInitialJobs={triggerGetInitialJobs}
            postsInfo={postsInfo}
            usersInfo={usersInfo}
            whichCookies={whichCookies}
            triggerGetUserInfo={triggerGetUserInfo}
        />
    );
}

export default JobsCtrl;
