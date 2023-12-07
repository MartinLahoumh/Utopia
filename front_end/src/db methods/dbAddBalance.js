import axios from 'axios';

// add money to balance using /balance/import
async function dbAddBalance(uid, key, amount) {
  let submission = {
    "uid": uid,
    "key": key,
    "amount": amount
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/balance/import', submission);
    const error = response.data.error || null;
    return error;

  } catch (error) {
    console.log(error);
  }
}

// Export the function as default
export default dbAddBalance;
