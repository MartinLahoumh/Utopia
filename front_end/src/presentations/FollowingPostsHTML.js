//components
import CreatePostCtrl from "../components/CreatePostCtrl";
import ViewCard from "../components/view-post-card";

function FollowingPostsHTML(props) {
    const colors = ["#80000000", "#0000fa55", "#00ff005b", "#ffff0055"];

    return (
        <>
            {/* component that allows you to make a new post */}
            <CreatePostCtrl info={props.info} triggerGetInitialPosts={props.triggerGetInitialPosts} />
            {props.postsInfo.map((post, index) => {
                const postContent = post[0]; // Assuming post info is an array with the post data as the first element
                const userContent = props.usersInfo[index][0]; // Assuming user info is an array with the user data as the first element

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
            })}
        </>
    );
}

export default FollowingPostsHTML;
