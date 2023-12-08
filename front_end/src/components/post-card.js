import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';
import { useState } from "react";
import { useCookies } from 'react-cookie';

const PostCard = (props)=> {
    let [tags, setTags] = useState({});
    let [body, setBody] = useState("");
    let [postType, setPostType] = useState("Post"); //Making a regular post, or an ad, or a job
    const [cookies, setCookie, removeCookie] = useCookies(['userType']);
    
    function handleTagChange(e) {
        if(e.target.id == '0'){
            setTags({ ...tags, 0: e.target.value });
        }
        else if(e.target.id == '1'){
            setTags({ ...tags, 1: e.target.value });
        }
        else if(e.target.id == '2'){
            setTags({ ...tags, 2: e.target.value });
        }
        
    }

    function handleBodyChange(e) {
        setBody(e.target.value);
    }

    function hanglePostTypeChange(e){
        setPostType(e.target.value);
    }
  return (
    <>
        <div className='card post-card-container'>
            <div className='card-header'>
                {/* Change to users own pfp */}
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    {/* Change to users own name */}
                    <h4 className='card-author'>{props.author}</h4>
                </div>
                <div className="tags">
                    <input className='tag' id='0'value={tags[0]} onChange={handleTagChange}/>
                    <input className='tag' id='1'value={tags[1]} onChange={handleTagChange}/>
                    <input className='tag' id='2'value={tags[2]} onChange={handleTagChange}/>
                </div>
            </div>

            {/* If the user is a corporate user, they will have 3 options: create a post, ad, or a job */}
            {cookies == 'Corporate'?
            <div className='post-type'>
                <h3>Type: </h3>
                <div className='option-tag'>
                    <label>Post</label>
                    <input onClick={hanglePostTypeChange} type="radio" name='post-option' value="Post"></input>
                </div>
                <div className='option-tag'>
                    <label>Ad</label>
                    <input onClick={hanglePostTypeChange} type="radio" name='post-option' value="Ad"></input>
                </div>
                <div className='option-tag'>
                    <label>Job</label>
                    <input onClick={hanglePostTypeChange} type="radio" name='post-option' value="Job"></input>
                </div>
            </div>:null}
            
            {/* Render what type of card based on what is to be created */}
            { postType == 'Post'?
            <div style={{backgroundColor: props.color}} className='card-body post-card-content'>
                <textarea className='post-card-body'value={body} onChange={handleBodyChange}/>
                <div className='img-area'> {/*Where we will place all submitted images of this post */}
                    {/*These are place holders to show you how they will look */}
                    <img className="card-pfp-img img-content" src={props.pfp}></img>
                    <img className="card-pfp-img img-content" src={props.pfp}></img>
                    <img className="card-pfp-img img-content" src={mario}></img>
                </div>
            </div>:
            postType == 'Ad'?
            <div style={{backgroundColor: props.color}} className='card-body post-card-content'>
                <label>URL</label>
                <input className='ad-url' value={body} onChange={handleBodyChange}/>
                <br/>
                <div className='ad-img-container'> {/*Where we will place all submitted images of this post */}
                    {/*These are place holders to show you how they will look */}
                    <img className="ad-img" src={props.pfp}></img>
                </div>
            </div>:
            postType == 'Job'?
            <div style={{backgroundColor: props.color}} className='card-body post-card-content'>
                <label>Position</label>
                <input className='job-position' value={body} onChange={handleBodyChange}/>
                <br/>
                <label>Requirement 1</label>
                <input className='job-position' value={body} onChange={handleBodyChange}/>
                <label>Requirement 2</label>
                <input className='job-position' value={body} onChange={handleBodyChange}/>
                <br/>
            </div>:null}

            <div className='button-area'>
                {/* This is a file input for them to submit their images. It is hidden so that I can style it.  
                Upon a user picking their image to upload, you will need to connect it to an image endpoint in the back end
                so that the image gets saved to the backend side, and we can access it from there. Create an array of string called 'imgArr'.
                Each element of this should be the img url that we will send to the back end upon uploading.*/}
                <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
                <form action='http://127.0.0.1:5000/media' target="dummyframe">
                    <input style={{opacity:"0%"}} onChange="form.submit()" type="file" name="img" id="img-upload"hidden/>
                    <button type='submit'>submit</button>
                </form>
                
                <label style={{width:'20%',height:'3.5vh',marginBottom:"10px", display:'flex', justifyContent:'center', alignItems:'center'}} for='img-upload' className="main-button">
                    Upload Media
                </label>
                {/* This is the post button. Upon clicking, submit all this info to the appropriate endpoint in the backend */}
                <button className='main-button' style={{width:'20%',marginBottom:'10px'}}>Post</button>
            </div>
        </div>
    </>
  );
}

export default PostCard;