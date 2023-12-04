import axios from 'axios';

//anon sign up - creates a new anon user using the /users/create endpoint

//returns [uid, password_hash, error]
//uid is the id of the newly created user
//password_hash is the hashed version of the password created for the anon user
//error is any error that may have occurred, null if none

export async function dbAnonSignUp() {
    const submission = {
        "type": "SURFER",
        "anonymous": true,
    }

    //ping the create user endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/users/create', submission);
        console.log(response);

        let uid = response["data"]["id"];
        let error = response["data"]["error"];
        let password_hash = response["data"]["password_hash"];
    
        console.log("returning", uid, password_hash, error);
    
        return [uid, password_hash, error];
    
    } catch(error) {
        console.log(error);
    }


}