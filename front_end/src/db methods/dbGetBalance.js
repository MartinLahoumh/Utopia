import axios from 'axios';

//get balance  - gets balance using the /balance/view endpoint

export async function dbGetBalance(uid, key) {

    const submission = {
        'uid': uid,
        'key': key
    }
    //console.log(submission);
    
    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/balance/view', submission);
        //console.log(response);

        const error = response["data"]["error"];
        const balance = response["data"]["balance"];
    
        return [balance, error];
    
    } catch (error) {
        console.log(error);
    }

}