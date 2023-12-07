//components
import CreatePostCtrl from "../components/CreatePostCtrl";
import ViewCard from "../components/view-post-card";

function ForYouHTML(props) {
    const colors = ["#fa000055", "#0000fa55", "#00ff005b", "#ffff0055"]

    return (
        <>
            {/* component that allows you to make a new post */}
            <CreatePostCtrl info={props.info} 
                            triggerGetInitialPosts={props.triggerGetInitialPosts} 
                            triggerGetUserInfo={props.triggerGetUserInfo}
                            whichCookies={props.whichCookies}/>

            {/* turn each post info into a post card component */}
            {props.postsInfo.map((post, index) => {
                const postContent = post[0];
                const userContent = props.usersInfo[index][0];
                //console.log(postContent, userContent);

                return (
                    <>
                        <ViewCard 
                            info={props.info}
                            postContent={postContent}
                            userContent={userContent}
                            color={colors[Math.floor(Math.random() * (4))]}
                            whichCookies={props.whichCookies}
                            triggerGetUserInfo={props.triggerGetUserInfo}
                            triggerGetPostInfo={props.triggerGetPostInfo}/>

                    </>
                );
            }
            )}
        </>
    );
}

export default ForYouHTML;