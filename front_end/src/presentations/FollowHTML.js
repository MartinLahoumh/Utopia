function FollowHTML(props) {
    let text = props.isFollowing ? "Unfollow" : "Follow";
    let clickBehavior = props.isFollowing ? props.triggerUnfollow : props.triggerFollow;

    if (props.me == props.you) {
        text = "You can't follow yourself stupid";
    }

    return (
        <>
            <div className='follow-button-post' onClick={clickBehavior}>{text}</div>
        </>
    );
}

export default FollowHTML;