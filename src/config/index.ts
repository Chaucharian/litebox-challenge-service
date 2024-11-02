// import * as firebase from './.keys/firebase.json';
// import * as cloudinary from './.keys/cloudinary.json';
import { getSecretsPath } from './getSecretsPath';

export default () => {
  return {
    // cloudinary,
    // firebase,
    cloudinary: require(getSecretsPath('firebase.json')),
    firebase: require(getSecretsPath('firebase.json')),
    TMDB_API_KEY: process.env.TMDB_API_KEY
  };
};