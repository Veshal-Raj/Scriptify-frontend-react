import axios from "axios";

export const uploadImage = async (img: string) => {
    let imageUrl = null;

    await axios.get(import.meta.env.BASE_URL + '/get-upload-url')
    .then( async ({ data: {uploadURL}}) => {

        await axios({
            method: 'PUT',
            url: uploadURL,
            headers: {'Content-Type': 'multipart/form-data'},
            data: img
        })
        .then(() => imageUrl = uploadURL.split('?')[0])
    })

    return imageUrl
}