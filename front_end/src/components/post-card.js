import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';
import { useState } from "react";

const PostCard = (props)=> {
    let [tags, setTags] = useState({});
    let [body, setBody] = useState("");
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
            <div style={{backgroundColor: props.color}} className='card-body post-card-content'>
                <textarea className='post-card-body'value={body} onChange={handleBodyChange}/>
                <div className='img-area'> {/*Where we will place all submitted images of this post */}
                    {/*These are place holders to show you how they will look */}
                    <img className="card-pfp-img img-content" src={props.pfp}></img>
                    <img className="card-pfp-img img-content" src={props.pfp}></img>
                    <img className="card-pfp-img img-content" src={mario}></img>
                </div>
            </div>
            <div className='button-area'>
                {/* This is a file input for them to submit their images. It is hidden so that I can style it.  
                Upon a user picking their image to upload, you will need to connect it to an image endpoint in the back end
                so that the image gets saved to the backend side, and we can access it from there. Create an array of string called 'imgArr'.
                Each element of this should be the img url that we will send to the back end upon uploading.*/}
                <input style={{opacity:"0%"}}accept="image/*" onChange={props.handlePfpChange} type="file" name="img" id="img-upload"hidden/>
                <label style={{width:'20%',height:'3.5vh',marginBottom:"10px", display:'flex', justifyContent:'center', alignItems:'center'}} for='img-upload' className="main-button">
                    Upload Image
                </label>
                {/* This is the post button. Upon clicking, submit all this info to the appropriate endpoint in the backend */}
                <button className='main-button' style={{width:'20%',marginBottom:'10px'}}>Post</button>
            </div>
        </div>
    </>
  );
}

export default PostCard;