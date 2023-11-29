import axios from 'axios';
import {sha256} from 'crypto-hash';

//sign in - checks user provided data against the DB account data using the /users/signin endpoint

//password is the password provided
//email is the username provided

//returns [userid, password_hash, error] of the user created
//error may be any errors that occured but is null if there are none

export async function dbSignIn(password, email) {
    const password_hashing = await sha256(password);

    const submission = {
        'username': email,
        'password_hash': password_hashing,
    }
    //ping the signin endpoint
    const response  = await axios.post('http://127.0.0.1:5000/users/signin', submission);
    console.log(response);

    const uid = response["data"]["uid"];
    const error = response["data"]["error"];

    return [uid, password_hashing, error];
}