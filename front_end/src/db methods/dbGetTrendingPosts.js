import axios from 'axios';

export async function dbGetTrendingPosts(uid, key, n) {
    const submission = {
        'uid': uid,
        'key': key, 
        'limit': n, 
    };

    console.log("trending submission", submission);

    try {
        // Send a POST request to the trending posts endpoint
        const response = await axios.post('http://127.0.0.1:5000/posts/trending', submission);
        console.log("trending response", response);


        return [response.data.posts, response.data.before, response.data.error];
    } catch (error) {
        console.log(error)
    }
}
