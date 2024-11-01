import * as firebase from './.keys/firebase.json';
import * as cloudinary from './.keys/cloudinary.json';

export default () => {
  return {
    cloudinary,
    firebase,
  };
};