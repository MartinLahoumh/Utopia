import axios from 'axios';

//create post - creates a post using the /posts/create endpoint

//uid is the user id of the user logged in 
//key is the stored pass hash that was used to log in
//text is the body of the post

//returns [result, error]
//result is the object that the endpoint gives back, so it would have keys corresponding to all the user columns
//error is the error encountered, null if none

export async function dbCreatePost(uid, key, text, keywords, postType) {

    const submission = {
        'uid': uid,
        'key': key,
        'text': text,
        'keywords': keywords,
        'type': postType
    }
    //ping the endpoint
    const response  = await axios.post('http://127.0.0.1:5000/posts/create', submission);
    console.log(response);

    const error = response["data"]["error"];
    const id = response["data"]["id"];

    return [id, error];
}