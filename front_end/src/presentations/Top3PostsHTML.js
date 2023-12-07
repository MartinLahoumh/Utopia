import ViewCard from "../components/view-post-card";

function Top3PostsHTML(props) {
    const colors = ["#fa000055", "#0000fa55", "#00ff005b", "#ffff0055"]

    return (
        <>
            Check out these posts yo!! (very cool) (top 3 liked)

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
                            triggerGetPostInfo={props.triggerGetPostInfo} />

                    </>
                );
            }
            )}

        </>
    );
}

export default Top3PostsHTML;