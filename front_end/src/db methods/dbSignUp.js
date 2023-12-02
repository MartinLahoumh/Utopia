import axios from 'axios';
import {sha256} from 'crypto-hash';

//sign up - creates a new user using the /users/create endpoint

//password is the unhashed version of the password provided
//email is the username provided
//pfp, bio, userType are what were also provided

//returns [uid, password_hash, error]
//uid is the id of the newly created user
//password_hash is the hashed version of the password provided 
//error is any error that may have occurred, null if none

export async function dbSignUp(password, email, pfp, bio, userType) {
    const password_hash = await sha256(password);

    const submission = {
        'username': email,
        'password_hash': password_hash,
        'avatar': pfp,
        'bio': bio,
        'user_type': userType,

    }

    //ping the create user endpoint
    const response = await axios.post('http://127.0.0.1:5000/users/create', submission);
    console.log(response);

    let uid = response["data"]["id"];
    let error = response["data"]["error"];

    return [uid, password_hash, error];
}