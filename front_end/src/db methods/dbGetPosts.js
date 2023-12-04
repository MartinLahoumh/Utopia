import axios from 'axios';

//get post - gets posts using the /posts/create endpoint

//uid is the user id of the user logged in 
//key is the stored pass hash that was used to log in
//text is the body of the post

//returns [result, error]
//result is the object that the endpoint gives back, so it would have keys corresponding to all the user columns
//error is the error encountered, null if none

export async function dbGetPosts(uid, key, limit, b4, types) {

    const submission = {
        'uid': uid,
        'key': key,
        'authors': null,
        'keywords': null,
        'likes': [0, 1000],
        'dislikes': [0, 1000],
        'limit': limit,
        'before': b4,
        'types': types
    }
    //console.log(submission);
    
    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/search', submission);
        //console.log(response);

        const error = response["data"]["error"];
        const posts = response["data"]["posts"];
        const before = response["data"]["before"];
    
        return [posts, before, error];
    
    } catch (error) {
        console.log(error);
    }

}