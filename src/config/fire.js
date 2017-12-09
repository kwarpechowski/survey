import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBkHbqZW36GvFltiGi1Nena3jB23r7laT8",
  authDomain: "emotionwheel.firebaseapp.com",
  databaseURL: "https://emotionwheel.firebaseio.com",
  projectId: "emotionwheel",
  storageBucket: "emotionwheel.appspot.com",
  messagingSenderId: "628667183308"
};
const fire = firebase.initializeApp(config);
export default fire;
