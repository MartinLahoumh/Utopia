//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//components
import JobCard from '../components/job-card';

function JobsHTML(props) {

    const tempRequirments = ['Good work ethic', 'team player'];

    return (
        <>
            <div className="job-posts-container">
                {/*Like with users, once you get the jobs, map it. I just made it temp values for demonstration purposes */}
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
            </div>

        </>
    )
}

export default JobsHTML;