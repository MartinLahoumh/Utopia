function CreateCommentHTML(props) {
    return (
        <>
            <div className='user-comment-container'>
                <textarea className='user-comment' type='text' placeholder="Add Comment" value={props.body} onChange={props.handleBodyChange}></textarea>
                <button onClick={props.triggerCreateComment}>Submit</button>
            </div>

        </>
    );
}

export default CreateCommentHTML;