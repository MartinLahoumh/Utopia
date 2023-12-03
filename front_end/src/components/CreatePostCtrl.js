//hooks
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

//assets
import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';

//components
import CreatePostHTML from '../presentations/CreatePostHTML';

const CreatePostCtrl = (props) => {
    //states for post content
    let [tags, setTags] = useState({});
    let [body, setBody] = useState("");
    let [postType, setPostType] = useState("Post"); //Making a regular post, or an ad, or a job
    //state to trigger data request
    let [requestSendPost, setRequestSendPost] = useState(false);


    useEffect(() => {
        async function handleSendPost() {
            if (requestSendPost) {
                try {
                    console.log("h");
                } catch(error) {
                    console.log(error)
                } finally {
                    setRequestSendPost(false);
                }
            }
        }
        handleSendPost();
    }, [requestSendPost]);

    function handleTagChange(e) {
        if (e.target.id == '0') {
            setTags({ ...tags, 0: e.target.value });
        }
        else if (e.target.id == '1') {
            setTags({ ...tags, 1: e.target.value });
        }
        else if (e.target.id == '2') {
            setTags({ ...tags, 2: e.target.value });
        }

    }

    //FUNCTIONS THAT UPDATE VALUES =======================================================================
    function handleBodyChange(e) {
        setBody(e.target.value);
    }

    function handlePostTypeChange(e) {
        setPostType(e.target.value);
    }

    //FUNCTIONS THAT PROCESS ACTIONS =======================================================================

    //function that starts the sending post process
    function triggerSendPost() {
        setRequestSendPost(true);
    }

    return (
        <>
            <CreatePostHTML postType={postType} handlePostTypeChange={handlePostTypeChange}
                            body={body} handleBodyChange={handleBodyChange}
                            tags={tags} handleTagChange={handleTagChange}
                            info={props.info}
                            color={props.color}
                            triggerSendPost={triggerSendPost}/>
        </>
    );
}

export default CreatePostCtrl;