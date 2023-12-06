//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import { dbDislikePost } from "../db methods/dbDislikePost";
import dbCheckDislike from "../db methods/dbCheckDislike";

//components
import DislikeHTML from "../presentations/DislikeHTML";

function DislikeCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //state to understand if this post's user is being liked
    const [isDisliking, setIsDisliking] = useState(dbCheckDislike(props.info, props.target));

    
    //effect hook that dynamically updates isLiking
    useEffect(() => {
        setIsDisliking(dbCheckDislike(props.info, props.target));
    }, [props.info, props.target]);

    //state that triggers a follow request
    const [requestDislike, setRequestDislike] = useState(false);

    const [me] = props.whichCookies();
    const you = props.author;


    //FOLLOWING ============================================================================

    //effect hook that processes a like request
    useEffect(() => {
        async function handleDislike() {
            if (requestDislike && me != you) {
                const [uid, key] = props.whichCookies();

                try {
                    //modify the db
                    const error = await dbDislikePost(uid, key, props.target);
                    //refresh the data
                    props.triggerGetUserInfo();
                    props.triggerGetPostInfo();
                } catch(error) {
                    console.log(error);
                } finally {
                    setRequestDislike(false);
                }
            }
        }
        handleDislike();
    }, [requestDislike]);

    function triggerDislike() {
        setRequestDislike(true);
    }

    return (
        <>
            <DislikeHTML me={me} you={you}
                        isDisliking={isDisliking}
                        triggerDislike={triggerDislike}/>
        </>
    )

}

export default DislikeCtrl;