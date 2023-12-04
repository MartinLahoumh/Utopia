import axios from "axios";

// Function to add targetid to uid's follow list
async function dbAddToFollow(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "target_user": targetid,
    "operation": "FOLLOW"
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/follow', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

export default dbAddToFollow;
