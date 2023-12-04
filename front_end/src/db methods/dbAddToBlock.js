import axios from 'axios';

// Function to add targetid to uid's block list
async function dbAddToBlock(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "blocked_id": targetid
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/block', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbAddToBlock;
