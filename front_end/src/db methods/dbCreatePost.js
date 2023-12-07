import axios from 'axios';

//create post - creates a post using the /posts/create endpoint

export async function dbCreatePost(uid, key, text, keywords, postType) {

    const submission = {
        'uid': uid,
        'author': uid,
        'key': key,
        'text': text,
        'keywords': keywords,
        'type': postType
    }

    //console.log(submission);

    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/posts/create', submission);
        console.log(response);

        const error = response["data"]["error"];
        const cost = response["data"]["cost"];
        const id = response["data"]["id"];
    
        return [id, cost, error];
    
    } catch(error) {
        console.log(error);
    }

}