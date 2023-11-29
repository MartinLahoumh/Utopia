import axios from 'axios';

//sign in - checks user provided data against the DB account data using the /users/signin endpoint
//password_hashing is the hashed version of the password provided
//email is the username provided
//returns the JSON response that the endpoint displayed

export async function dbSignIn(password_hashing, email) {
    const submission = {
        'username': email,
        'password_hash': password_hashing,
    }
    //ping the signin endpoint
    const response  = await axios.post('http://127.0.0.1:5000/users/signin', submission);
    console.log(response);

    return response;
}