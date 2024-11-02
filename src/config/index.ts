import { getSecretsPath } from './getSecretsPath';

export default () => {
  return {
    cloudinary: require(getSecretsPath('cloudinary.json')),
    firebase: require(getSecretsPath('firebase.json')),
    TMDB_API_KEY: process.env.TMDB_API_KEY
  };
};