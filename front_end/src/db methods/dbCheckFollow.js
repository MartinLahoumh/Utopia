import axios from "axios";

async function dbCheckFollow(uid, key, targetid) {
  let submission = {
    "uid": uid,
    "key": key,
    "target_id": targetid
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000', submission);
    const isFollowing = response.data.isFollowing || false;
    const error = response.data.error || null;

    return { isFollowing, error };

  } catch (error) {
    console.error(error);
    return { isFollowing: false, error: error.message };
  }
}

export default dbCheckFollow;
