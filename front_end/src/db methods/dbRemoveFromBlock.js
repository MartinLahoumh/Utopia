import axios from 'axios';

// Function to remove targetid from uid's block list
async function dbRemoveFromBlock(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "blocked_id": targetid
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/unblock', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

export default dbRemoveFromBlock;
