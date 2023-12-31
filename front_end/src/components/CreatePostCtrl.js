//hooks
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

//assets
import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';

//methods
import { dbCreatePost } from "../db methods/dbCreatePost";

//components
import CreatePostHTML from '../presentations/CreatePostHTML';

const CreatePostCtrl = (props) => {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies(['uid']);

    //states for post content
    let [tags, setTags] = useState(["", "", ""]);
    let [body, setBody] = useState("");
    let [postType, setPostType] = useState("POST"); //Making a regular post, or an ad, or a job
    let [images, setImages] = useState(["", ""]);
    
    //state to trigger data request
    let [requestSendPost, setRequestSendPost] = useState(false);


    //effect hooks that actually sends the post to the database
    useEffect(() => {
        async function handleSendPost() {
            if (requestSendPost) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //make the post
                    const [id, cost, error] = await dbCreatePost(uid, key, body, tags, postType, images);
                    //console.log(id);

                    //if successful, clear the fields
                    if (error == null && cost == 0) {
                        setBody("");
                        setTags(["", "", ""]);
                        setImages(["", ""]);
                        alert("Post created.");
                    } else if (error == null) {
                        setBody("");
                        setTags(["", "", ""]);
                        setImages(["", ""]);
                        alert(`Post created, but you paid $${cost}!!! Get owned!!!`);   
                    } else {
                        alert("Error: " + error);
                    }

                    //next, refresh the posts
                    props.triggerGetInitialPosts();
                    props.triggerGetUserInfo(); //this is to update the balance
                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestSendPost(false);
                }
            }
        }
        handleSendPost();
    }, [requestSendPost]);

    function handleTagChange(e) {
        let newTags = [...tags];
        if (e.target.id == '0') {
            newTags[0] = e.target.value;
        }
        else if (e.target.id == '1') {
            newTags[1] = e.target.value;
        }
        else if (e.target.id == '2') {
            newTags[2] = e.target.value;
        }
        setTags(newTags);
    }

    const handleImageChange = (value)=>{
        let newImages = [...images];
        if(images[0] == ""){
            newImages[0] = value;
        }
        else if(images[1] == ""){
        newImages[1] = value;
        }
        else{
        alert("YOU HAVE TO MANY IMAGES, CAN NOT BE UPLOADED!!");
        }
        console.log(newImages);
        setImages(newImages);
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
                            images={images} handleImageChange={handleImageChange}
                info={props.info}
                color={props.color}
                triggerSendPost={triggerSendPost} />
        </>
    );
}

export default CreatePostCtrl;