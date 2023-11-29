import axios from 'axios';
import {sha256} from 'crypto-hash';

//sign up - creates a new user using the /users/create endpoint

//password is the unhashed version of the password provided
//email is the username provided
//pfp, bio, userType are what were also provided

//returns any errors that may have occurred, null if none

export async function dbSignUp(password, email, pfp, bio, userType) {
    const password_hashing = await sha256(password);

    const submission = {
        'username': email,
        'password_hash': password_hashing,
        'avatar': pfp,
        'bio': bio,
        'user_type': userType,

    }

    //ping the create user endpoint
    const response = await axios.post('http://127.0.0.1:5000/users/create', submission);
    console.log(response);

    let error = response["data"]["error"];
    return error;
}