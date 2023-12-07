//components
import ViewCommentHTML from "./ViewCommentHTML";

function ViewCommentsHTML(props) {
    if (props.commentsInfo.length == 0) {
        return "No comments here get owned";
    }
    return (
        <>
            {props.commentsInfo.map((comment, index) => {
                const commentInfo = comment[0];
                const userInfo = props.usersInfo[index][0];

                return (
                    <>
                        <ViewCommentHTML text={commentInfo['text']}
                                         username={userInfo['username']}/>
                    </>
                );
            })}
        </>
    );
}

export default ViewCommentsHTML;