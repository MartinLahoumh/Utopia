import axios from 'axios';

export async function dbGetPostInfo(uid, key, postid) {

    const submission = {
        'uid': uid,
        'key': key,
        'id': postid
    }

    try {
        const response = await axios.post('http://127.0.0.1:5000/posts/info', submission);
        //console.log(response);

        let result = response["data"];
        const error = result["error"];
        delete result["error"];
    
        return [result, error];
    
    } catch (error) {
        console.log(error);
    }

}