import axios from 'axios';

export async function ShowJobs(uid, key){
    const submission = {
        'uid': uid,
        'key': key,
        'before': null
    }

    try {
        const response = await axios.post("http://127.0.0.1:5000/jobs/show", submission);
        //console.log(response);
        console.log(response);
        let result = response["data"]["posts"];
        console.log(result);
        const error = result["error"];
        delete result["error"];
    
        return [result, error];
    
    } catch (error) {
        console.log(error);
    }
}