//assets
import heart from '../static/images/heart.png';


function LikeHTML(props) {
    let text = props.isLiking ? "Unlike" : "Like";

    if (props.me == props.you) {
        text = "You can't like yourself stupid";
    }

    return (
        <>
            <img className="card-pfp-img likes" onClick={props.triggerLike} src={heart} />
            {text}
        </>
    );
}

export default LikeHTML;