//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import { dbLikePost } from "../db methods/dbLikePost";
import dbCheckLike from "../db methods/dbCheckLike";

//components
import LikeHTML from "../presentations/LikeHTML";

function LikeCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //state to understand if this post's user is being liked
    const [isLiking, setIsLiking] = useState(dbCheckLike(props.info, props.target));

    
    //effect hook that dynamically updates isLiking
    useEffect(() => {
        setIsLiking(dbCheckLike(props.info, props.target));
    }, [props.info, props.target]);

    //state that triggers a follow request
    const [requestLike, setRequestLike] = useState(false);

    const [me] = props.whichCookies();
    const you = props.author;


    //FOLLOWING ============================================================================

    //effect hook that processes a like request
    useEffect(() => {
        async function handleLike() {
            if (requestLike && me != you) {
                const [uid, key] = props.whichCookies();

                try {
                    //modify the db
                    const error = await dbLikePost(uid, key, props.target);
                    //refresh the data
                    props.triggerGetUserInfo();
                    props.triggerGetPostInfo();
                } catch(error) {
                    console.log(error);
                } finally {
                    setRequestLike(false);
                }
            }
        }
        handleLike();
    }, [requestLike]);

    function triggerLike() {
        setRequestLike(true);
    }

    return (
        <>
            <LikeHTML me={me} you={you}
                        isLiking={isLiking}
                        triggerLike={triggerLike}/>
        </>
    )

}

export default LikeCtrl;