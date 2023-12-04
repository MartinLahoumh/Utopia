import axios from 'axios';

//create balance  - creates balance for a fresh user using the /balance/init endpoint

export async function dbCreateBalance(uid, key) {

    const submission = {
        'uid': uid,
        'key': key
    }
    console.log(submission);
    
    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/balance/init', submission);
        console.log(response);

        const error = response["data"]["error"];
    
        return error;
    
    } catch (error) {
        console.log(error);
    }

}