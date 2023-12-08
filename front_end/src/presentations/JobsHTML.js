//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//components
import JobCard from '../components/job-card';
import axios from 'axios';
import { useState } from 'react';
import { ShowJobs } from '../db methods/dbGetJobs';
function JobsHTML(props) {

    const colors = ["#fa000055", "#0000fa55", "#00ff005b", "#ffff0055"]

    return (
        <>
            
            <div className="job-posts-container">
                {props.jobs.map((job) => (
                        <JobCard color={colors[Math.floor(Math.random() * (4))]} jobIcon={biden_pfp} position={job[0]} req1={job[1]} req2={job[2]} />
                ))}
                {/*Like with users, once you get the jobs, map it. I just made it temp values for demonstration purposes */}
                
            </div>

        </>
    )
}

export default JobsHTML;