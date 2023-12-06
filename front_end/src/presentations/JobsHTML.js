import JobCard from '../components/job-card';

import React from 'react';
import ViewCard from '../components/view-post-card';

function JobsHTML(props) {
    const colors = ["#006949FF", "#0000fa55", "#00ff005b", "#ffff0055"];

    return (
        <>
            {props.postsInfo.map((post, index) => {
                // Assuming the structure of post and user info is similar to the previous components
                const postContent = post[0]; // post data
                const userContent = props.usersInfo[index][0]; // user data

                // Filtering only 'job' type posts
                if (postContent.type === 'JOB') {
                    return (
                        <ViewCard 
                            info={props.info}
                            postContent={postContent}
                            userContent={userContent}
                            color={colors[Math.floor(Math.random() * colors.length)]}
                            whichCookies={props.whichCookies}
                            triggerGetUserInfo={props.triggerGetUserInfo}
                        />
                    );
                } else {
                    return null; // Skip non-job posts
                }
            })}
        </>
    );
}

export default JobsHTML;

