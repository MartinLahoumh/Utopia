import axios from 'axios';

export async function Search(uid, key, authors, keywords, likes, dislikes, types, sort, parent){
    const submission = {
        'uid': uid,
        'key': key,
        'before': null,
        'authors': authors,
        'keywords': keywords,
        'likes': likes,
        'dislikes': dislikes,
        'types': types,
        'sort': sort,
        'parent': parent
    }
    try {
        const response = await axios.post("http://127.0.0.1:5000/search", submission);
        //console.log(response);
        console.log(response);
        let result = response["data"]['posts'];
        console.log(result);
        const error = result["error"];
        delete result["error"];
    
        return [result, error];
    
    } catch (error) {
        console.log(error);
    }
}