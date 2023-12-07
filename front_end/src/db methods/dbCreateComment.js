import axios from 'axios';

//create comment - creates a comment using the /posts/create endpoint

export async function dbCreateComment(uid, key, text, parent) {

    const submission = {
        'uid': uid,
        'author': uid,
        'key': key,
        'text': text,
        'keywords': ["", "", ""],
        'type': 'COMMENT',
        'parent': parent
    }

    console.log("comment submission", submission);

    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/posts/create', submission);
        console.log(response);

        const error = response["data"]["error"];
        const id = response["data"]["id"];
        const cost = response["data"]["cost"];
    
        return [id, cost, error];
    
    } catch(error) {
        console.log(error);
    }

}