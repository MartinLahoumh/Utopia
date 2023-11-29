import axios from 'axios';

//sign up - creates a new user using the /users/create endpoint
//password_hashing is the hashed version of the password provided
//email is the username provided
//pfp, bio, userType are what were also provided
//returns the JSON response that the endpoint displayed

export async function dbSignUp(password_hashing, email, pfp, bio, userType) {
    const submission = {
        'username': email,
        'password_hash': password_hashing,
        'avatar': pfp,
        'bio': bio,
        'user_type': userType,

    }

    //ping the create user endpoint
    const response = await axios.post('http://127.0.0.1:5000/users/create', submission);

    return response;
}