//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//methods
import dbCheckFollow from "../db methods/dbCheckFollow";
import dbAddToFollow from "../db methods/dbAddToFollow";
import dbRemoveFromFollow from "../db methods/dbRemoveFromFollow";

//components
import FollowHTML from "../presentations/FollowHTML";

function FollowCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //state to understand if this post's user is being followed
    const [isFollowing, setIsFollowing] = useState(dbCheckFollow(props.info, props.target));

    
    //effect hook that dynamically updates isFollowing
    useEffect(() => {
        setIsFollowing(dbCheckFollow(props.info, props.target));
    }, [props.info, props.target]);

    //state that triggers a follow request
    const [requestFollow, setRequestFollow] = useState(false);
    const [requestUnfollow, setRequestUnfollow] = useState(false);

    const [me] = props.whichCookies();


    //FOLLOWING ============================================================================

    //effect hook that processes a follow request
    useEffect(() => {
        async function handleFollow() {
            if (requestFollow) {
                const [uid, key] = props.whichCookies();

                try {
                    //modify the db
                    const error = await dbAddToFollow(uid, key, props.target);
                    //refresh the data
                    props.triggerGetUserInfo();
                } catch(error) {
                    console.log(error);
                } finally {
                    setRequestFollow(false);
                }
            }
        }
        handleFollow();
    }, [requestFollow]);

    function triggerFollow() {
        setRequestFollow(true);
    }

    //UNFOLLOWING ============================================================================

    //effect hook that processes an unfollow request
    useEffect(() => {
        async function handleUnfollow() {
            if (requestUnfollow) {
                const [uid, key] = props.whichCookies();

                try {
                    //modify the db
                    const error = await dbRemoveFromFollow(uid, key, props.target);
                    //refresh the data
                    props.triggerGetUserInfo();
                } catch(error) {
                    console.log(error);
                } finally {
                    setRequestUnfollow(false);
                }
            }
        }
        handleUnfollow();
    }, [requestUnfollow]);

    function triggerUnfollow() {
        setRequestUnfollow(true);
    }
    
    return (
        <>
            <FollowHTML me={me} you={props.target}
                        isFollowing={isFollowing}
                        triggerFollow={triggerFollow} triggerUnfollow={triggerUnfollow}/>
        </>
    )

}

export default FollowCtrl;