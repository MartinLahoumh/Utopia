import axios from 'axios';

export async function submitImage(imageFile, images, handleImageChange){
    console.log("s: ", imageFile);

    const formData = new FormData();
    formData.append('image', imageFile);

    console.log(formData);

    try {
      const response = await axios.post('http://127.0.0.1:5000/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      handleImageChange(response['data']['location']);
    } catch (error) {
      console.error(error);
    }
};