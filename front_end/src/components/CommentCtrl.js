import { useState } from 'react';

import CommentHTML from "../presentations/CommentHTML";

function CommentCtrl(props) {
    //state to show comments or not
    const [showComments, setShowComments] = useState(false);

    //These below are in this component, not the view comments component, so that createcomment can also access this method.
    //however, comments will be requested in the viewcommentcard so that the post only loads comments when expanded.

    //state to request getting comments or not
    const [requestGetInitialComments, setRequestGetInitialComments] = useState(false);

    //function to trigger getting comments
    function triggerGetInitialComments() {
        setRequestGetInitialComments(true);
    }

    return (
        <>
            <CommentHTML showComments={showComments} setShowComments={setShowComments}
                        whichCookies={props.whichCookies}
                        parent={props.parent}
                        requestGetInitialComments={requestGetInitialComments}
                        triggerGetInitialComments={triggerGetInitialComments}
                        setRequestGetInitialComments={setRequestGetInitialComments}/>
        </>
    )
}

export default CommentCtrl;