function ViewCommentHTML(props) {
    return (
        <>
            <div className='comments'>
                {/* <img className='card-pfp-img comment-pfp-img'></img> */}
                <p>{props.username}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h5 className='comment-body'>{props.text}</h5>
            </div>

        </>
    );
}

export default ViewCommentHTML;