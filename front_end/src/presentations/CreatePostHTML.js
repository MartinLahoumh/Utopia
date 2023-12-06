//assets
import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';
import axios from 'axios';
import { useState } from 'react';
import { submitImage } from '../db methods/dbSubmitImage';
const CreatePostHTML = (props) => {
    
    const username = props.info['type'] == null ? 'Anon' : props.info['username'];

    const postPicker = props.info['type'] == 'CORPORATE' ?
        (<div className='post-type'>
            <h3>Type: </h3>
            <div className='option-tag'>
                <label>Post</label>
                <input onClick={props.handlePostTypeChange} type="radio" name='post-option' value="POST"></input>
            </div>
            <div className='option-tag'>
                <label>Ad</label>
                <input onClick={props.handlePostTypeChange} type="radio" name='post-option' value="AD"></input>
            </div>
            <div className='option-tag'>
                <label>Job</label>
                <input onClick={props.handlePostTypeChange} type="radio" name='post-option' value="JOB"></input>
            </div>
        </div>) : null

    //postBody
    let postBody = null;
    switch (props.postType) {
        case 'POST':
            postBody = (
                <>
                    <textarea className='post-card-body' value={props.body} onChange={props.handleBodyChange} />
                    {/*Change later so it shows all images, this is just here to make sure it works, gonna work on other important stuff now */}
                    {props.images[0] != null?
                        <div className='ad-container'> {/*Where we will place all submitted images of this post */}
                            {/*These are place holders to show you how they will look */}
                                <img className="ad" src={"http://127.0.0.1:5000"+props.images[0]}></img>
                        </div>
                    :null}
                </>
            )
            break;
        case 'AD':
            postBody = (
                <>
                    <label>URL</label>
                    <input className='ad-url' value={props.body} onChange={props.handleBodyChange} />
                    <br />
                    <div className='ad-img-container'> {/*Where we will place all submitted images of this post */}
                        {/*These are place holders to show you how they will look */}
                        <img className="ad-img" src={mario}></img>
                    </div>
                </>
            )
            break;
        case 'JOB':
            postBody = (
                <>
                    <label>Position</label>
                    <input className='job-position' value={props.body} onChange={props.handleBodyChange} />
                    <br />
                    <label>Requirement 1</label>
                    <input className='job-position' value={props.body} onChange={props.handleBodyChange} />
                    <label>Requirement 2</label>
                    <input className='job-position' value={props.body} onChange={props.handleBodyChange} />
                    <br />
                </>
            )
            break;
    }


    const getImageFile = (e)=>{
        const uploadedImg = e.target.files[0];
        submitImage(uploadedImg, props.images, props.handleImageChange);
    }

    return (
        <>
            <div className='card post-card-container'>
                <div className='card-header'>
                    {/* pfp */}
                    <img className='card-pfp-img' src={props.info["avatar"]} alt="wah" />
                    {/* author */}
                    <div className='card-author-container'>
                        <h4 className='card-author'>{username}</h4>
                    </div>
                    {/* tags */}
                    <div className="tags">
                        <p>Enter tags:</p>
                        <input className='tag' id='0' value={props.tags[0]} onChange={props.handleTagChange} />
                        <input className='tag' id='1' value={props.tags[1]} onChange={props.handleTagChange} />
                        <input className='tag' id='2' value={props.tags[2]} onChange={props.handleTagChange} />
                    </div>
                </div>

                {/* If the user is a corporate user, they will have 3 options: create a post, ad, or a job */}
                {postPicker}

                {/* Render what type of card based on what is to be created */}
                <div style={{ backgroundColor: props.color }} className='card-body post-card-content'>
                    {postBody}
                </div>

                <div className='button-area'>
                    {/* This is a file input for them to submit their images. It is hidden so that I can style it.  
                Upon a user picking their image to upload, you will need to connect it to an image endpoint in the back end
                so that the image gets saved to the backend side, and we can access it from there. Create an array of string called 'imgArr'.
                Each element of this should be the img url that we will send to the back end upon uploading.*/}
                
                <form action='http://127.0.0.1:5000/media' target="dummyframe">
                    <input style={{opacity:"0%"}}  type="file" name="img" id="img-upload"hidden onChange={getImageFile}/>
                    <label style={{ width: '100%', height: '3.5vh', marginBottom: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center' }} for='img-upload' className="main-button">
                        Upload Media
                    </label>
                </form>
                    
                    {/* This is the post button. Upon clicking, submit all this info to the appropriate endpoint in the backend */}
                    <button className='main-button' style={{ width: '20%', marginBottom: '10px' }} onClick={props.triggerSendPost}>
                        Post
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreatePostHTML;