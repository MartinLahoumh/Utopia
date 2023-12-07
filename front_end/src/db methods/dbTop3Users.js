import axios from 'axios';

// get top 3 users using /users/top3users
async function dbTop3Users(uid, key) {
  let submission = {
    "uid": uid,
    "key": key,
  };

  //console.log("top3users", submission);

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/top3users', submission);
    const error = response['data']['error'];
    const users = response['data']['users'];
    return [users, error];

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbTop3Users;
