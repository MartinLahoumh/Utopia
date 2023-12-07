import axios from 'axios';

export async function dbGetOnlyFollowedPosts(uid, key, n, before) {
    const submission = {
        uid: uid,
        key: key, 
        limit: n,
        before:before
    };

try {
        //Send a POST request to the followed posts endpoint
        const response = await axios.post('http://127.0.0.1:5000/posts/homepage', submission);
        return [response.data.posts, error]
      } catch (error) {
        console.log(error)
    }
}
