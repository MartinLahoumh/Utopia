//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//components
import CreatePostCtrl from "../components/CreatePostCtrl";
import ViewCard from "../components/view-post-card";
import JobCard from "../components/job-card";

function PageHTML(props) {
    let pageContent = <></>;

    //display logic
    // const showPostCard = cookies.loggedIn == true ? postCard : <></>;

    const suggested_users = [] //Get from the backend and fill it here
    const trending_users = [] //Get from the backend and fill it here

    const tempRequirments = ['Good work ethic', 'team player'];

    if (props.page == 'ForYou') {
        const colors = ["#fa000055", "#0000fa55", "#00ff005b", "#ffff0055"]
        pageContent = (
            <>
                <CreatePostCtrl info={props.info} />
                {props.posts.map((post) => (
                    <ViewCard pfp={post["pfp"]} author={post["author"]} body={post["body"]} color={colors[Math.floor(Math.random() * (4))]} likes={post["likes"]} tags={post["tags"]} />
                ))}
            </>
        )
    }
    else if (props.page == 'Jobs') {
        pageContent = (
            <div className="job-posts-container">
                {/*Like with users, once you get the jobs, map it. I just made it temp values for demonstration purposes */}
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
                <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments} />
            </div>
        )
    }

    return (
        <>
            <div className="posts-container">
                <div className="main-filters">
                    <h4 id="ForYou" className="filter-option" onClick={props.changePage}>For You.</h4>
                    <h4 id="Following" className="filter-option" onClick={props.changePage}>Following.</h4>
                    <h4 id="Jobs" className="filter-option" onClick={props.changePage}>Jobs.</h4>
                </div>
                Bingus {props.test}
                {pageContent}
            </div>
        </>
    )
}

export default PageHTML;