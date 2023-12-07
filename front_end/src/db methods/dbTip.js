import axios from 'axios';

// tip using /uesrs/tip
async function dbTip(uid, key, target, amount) {
  let submission = {
    "uid": uid,
    "key": key,
    "target_id": target,
    "amount": amount
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/tip', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbTip;
