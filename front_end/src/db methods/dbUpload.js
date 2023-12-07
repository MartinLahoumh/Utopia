import axios from 'axios';

export async function dbUpload(uid, key, file) {
    const submission = {
        uid: uid,
        key: key, 
        data: file.base64, 
        type: file.type 
    };
    try {
        //Send a request to the image upload endpoint
        const response = await axios.post('http://127.0.0.1:5000/users/upload', submission);
        return [response.data.id, error];
    } catch (error) {
        console.log(error)
    }
}
