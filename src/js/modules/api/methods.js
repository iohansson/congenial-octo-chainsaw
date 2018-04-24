import axios from 'axios';

const imageUploadURL = 'https://api.cloudinary.com/v1_1/helgejohansson/auto/upload';

export function getQuizzes() {
  return [];
}

/**
 * Uploads image and returns result
 * @param {Base64|URL} image
 * @return {Promise}
 */
export function uploadImage(image) {
  return axios({
    method: 'post',
    url: imageUploadURL,
    data: {
      upload_preset: 'klerkimage',
      file: image,
    },
  });
}
