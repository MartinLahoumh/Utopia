import axios from 'axios';

// Function to remove targetid from uid's follow list
async function dbRemoveFromFollow(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "target_user": targetid,
    "operation": "UNFOLLOW"
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/follow', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

export default dbRemoveFromFollow;
