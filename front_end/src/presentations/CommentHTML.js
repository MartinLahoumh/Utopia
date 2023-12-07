//components
import CreateCommentCtrl from "../components/CreateCommentCtrl";
import ViewCommentsCtrl from "../components/ViewCommentsCtrl";

function CommentHTML(props) {
    if (props.showComments) {
        return (
            <>
                <div className='comment-button-open'>

                    <CreateCommentCtrl whichCookies={props.whichCookies}
                                       parent={props.parent}
                                       triggerGetInitialComments={props.triggerGetInitialComments}/>

                    <ViewCommentsCtrl whichCookies={props.whichCookies} 
                                      parent={props.parent}
                                      requestGetInitialComments={props.requestGetInitialComments}
                                      triggerGetInitialComments={props.triggerGetInitialComments}
                                      setRequestGetInitialComments={props.setRequestGetInitialComments}/>
                </div>
                <button onClick={() => { console.log("CLICK!"); props.setShowComments(false); }} className='comment-button'>
                    ^
                </button>
            </>
        );
    }

    return (
        <button onClick={() => { console.log("CLICK!"); props.setShowComments(true); }} className='comment-button'>
            V
        </button>
    );

}

export default CommentHTML;