import axios from 'axios';

// Function to remove targetid from uid's follow list
async function dbRemoveFromFollow(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "target_user": targetid
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000', submission);
    const error = response.data.error || null;
    return { error };

  } catch (error) {
    return { error: error.message };
  }
}

export default dbRemoveFromFollow;
