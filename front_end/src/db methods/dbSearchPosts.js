import axios from 'axios';

export async function dbSearchPosts(uid, key, searchMode) {
    const submission = {
        uid: uid,
        key: key,
        limit: 10, 
        types: ["POST"] 
    };

    try {
        // endpoint axios search
        const response = await axios.post('http:#127.0.0.1:5000/search', submission);
        let listOfResults = [];

    //filter by author or keyword
        switch (searchMode) {
            case 'byAuthor':
                listOfResults = response.data.posts.filter(post => post.author === key);
                break;
            case 'byKeyword':
                listOfResults = response.data.posts.filter(post => post.keywords.includes(key));
                break;
        }

        return [listOfResults,error];
    } catch (error) {
        console.log(error);
    }
}
