import axios from 'axios';

export async function dbChangeBalance(uid, key, change) {
    const submission = {
        uid: uid,
        key: key,
        change: change
    };

    try {
       //Send a request to the balance import endpoint
        const response = await axios.post('http://127.0.0.1:5000/balance/import', submission);
        return [response.data.newBal, errorl];
         } catch (error) {
        console.log(error)
    }
}    
