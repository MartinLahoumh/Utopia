//components
import CreatePostCtrl from "../components/CreatePostCtrl";
import ViewCard from "../components/view-post-card";

function ForYouHTML(props) {
    const colors = ["#fa000055", "#0000fa55", "#00ff005b", "#ffff0055"]

    return (
        <>
            {/* component that allows you to make a new post */}
            <CreatePostCtrl info={props.info} triggerGetInitialPosts={props.triggerGetInitialPosts} />

            {/* turn each post info into a post card component */}
            {props.postsInfo.map((post, index) => {
                const postContent = post[0];
                const userContent = props.usersInfo[index][0];
                //console.log(postContent, userContent);

                return (
                    <>
                        <ViewCard pfp={userContent["avatar"]}
                            author={userContent["username"]}
                            body={postContent["text"]}
                            color={colors[Math.floor(Math.random() * (4))]}
                            likes={postContent["likes"]}
                            dislikes={postContent["dislikes"]}
                            tags={postContent["keywords"]} 
                            views={postContent["views"]}
                            date={postContent["time_posted"]}/>

                    </>
                );
            }
            )}
        </>
    );
}

export default ForYouHTML;