import axios from 'axios';

//like post - likes posts using the /posts/like endpoint


export async function dbLikePost(uid, key, post_id) {

    const submission = {
        'uid': uid,
        'key': key,
        'post_id': post_id
    }
    //console.log(submission);
    
    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/posts/like', submission);
        //console.log(response);

        const error = response["data"]["error"];
    
        return error;
    
    } catch (error) {
        console.log(error);
    }

}