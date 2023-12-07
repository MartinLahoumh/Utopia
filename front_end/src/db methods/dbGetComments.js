import axios from 'axios';

//get comments - gets comments using the /search endpoint


export async function dbGetComments(uid, key, limit, b4, parent) {

    const submission = {
        'uid': uid,
        'key': key,
        'authors': null,
        'keywords': null,
        'likes': [null, null],
        'dislikes': [null, null],
        'limit': limit,
        'before': b4,
        'types': ['COMMENT'],
        'sort': 'NEWEST',
        'parent': parent
    }
    console.log("comment getting", submission);
    
    //ping the endpoint
    try {
        const response = await axios.post('http://127.0.0.1:5000/search', submission);
        //console.log(response);

        const error = response["data"]["error"];
        const posts = response["data"]["posts"];
        const before = response["data"]["before"];
    
        return [posts, before, error];
    
    } catch (error) {
        console.log(error);
    }

}