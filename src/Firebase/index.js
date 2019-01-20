import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwBHRyJie6ddg4aiLRU17rbKl90gw8eMc",
    authDomain: "kusa-6f28a.firebaseapp.com",
    databaseURL: "https://kusa-6f28a.firebaseio.com",
    projectId: "kusa-6f28a",
    storageBucket: "kusa-6f28a.appspot.com",
    messagingSenderId: "494628489378"
};
firebase.initializeApp(config);

const storage = firebase.storage();
const database = firebase.database();
export {
    storage, database,firebase as default
}