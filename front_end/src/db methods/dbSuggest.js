import axios from 'axios';

// get top 3 users using /users/top3users
async function dbSuggest(uid, key) {
  let submission = {
    "uid": uid,
    "key": key,
  };

  //console.log("top3posts", submission)

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/suggest', submission);
    const error = response['data']['error'];
    const users = response['data']['users'];
    return [users, error];

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbSuggest;
