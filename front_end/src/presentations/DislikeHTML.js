//assets
import brokenHeart from '../static/images/broken-heart.png';


function DislikeHTML(props) {
    let text = props.isDisliking ? "Undislike" : "Dislike";

    if (props.me == props.you) {
        text = "You can't dislike yourself stupid";
    }

    return (
        <>
            <img className="card-pfp-img likes" onClick={props.triggerDislike} src={brokenHeart} />
            {text}
        </>
    );
}

export default DislikeHTML;