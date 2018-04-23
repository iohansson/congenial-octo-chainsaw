import axios from 'axios';

const imageUploadURL = 'https://api.cloudinary.com/v1_1/helgejohansson/auto/upload';

export function getQuizzes() {
  return [];
}

/**
 * Uploads base64 image and returns result
 * @param {Base64} base64image
 * @return {Promise}
 */
export function uploadImage(base64image) {
  return axios({
    method: 'post',
    url: imageUploadURL,
    data: {
      upload_preset: 'klerkimage',
      file: base64image,
    },
  });
}
