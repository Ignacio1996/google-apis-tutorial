import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAeWxzZ2oHAL9odjwI51Gk7qxEucsaX8ug",
  authDomain: "apis-e59a3.firebaseapp.com",
  databaseURL: "https://apis-e59a3.firebaseio.com",
  projectId: "apis-e59a3",
  storageBucket: "apis-e59a3.appspot.com",
  messagingSenderId: "664634203355",
  appId: "1:664634203355:web:d5c4958d3cdf8b4ee040fe",
  measurementId: "G-GX33PNHGLE"
};

firebase.initializeApp(firebaseConfig);

export default firebase;