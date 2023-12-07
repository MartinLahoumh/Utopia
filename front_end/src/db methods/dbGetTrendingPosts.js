import axios from 'axios';

export async function dbGetTrendingPosts(uid, key, n, before) {
    const submission = {
        uid: uid,
        key: key, 
        limit: n, 
     before:before
    };

 

    try {
        // Send a POST request to the trending posts endpoint
        const response = await axios.post('http://127.0.0.1:5000/posts/trending', submission);
        return [response.data.posts];
    } catch (error) {
        console.log(error)
    }
}
