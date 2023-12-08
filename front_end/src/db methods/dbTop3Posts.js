import axios from 'axios';

// get top 3 users using /users/top3users
async function dbTop3Posts(uid, key) {
  let submission = {
    "uid": uid,
    "key": key,
  };

  //console.log("top3posts", submission)

  try {
    const response = await axios.post('http://127.0.0.1:5000/posts/top3posts', submission);
    const error = response['data']['error'];
    const posts = response['data']['posts'];

    console.log("top 3 posts", posts);
    return [posts, error];

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbTop3Posts;
