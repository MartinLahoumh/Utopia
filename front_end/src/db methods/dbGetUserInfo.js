import axios from 'axios';

//get user info - gets user info using the /users/info endpoint

//uid is the user id of the user logged in 
//key is the stored pass hash that was used to log in

//returns [result, error]
//result is the object that the endpoint gives back, so it would have keys corresponding to all the user columns
//error is the error encountered, null if none

export async function dbGetUserInfo(uid, key) {

    const submission = {
        'uid': uid,
        'key': key,
    }
    //ping the signin endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/users/info', submission);
        console.log(response);

        let result = response["data"];
        const error = result["error"];
        delete result["error"];
    
        return [result, error];
    
    } catch (error) {
        console.log(error);
    }

}