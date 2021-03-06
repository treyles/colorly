import Rebase from 're-base';
import firebase from 'firebase';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBbo9PZqpGpRHW2Lmz3Q9XEsBU2jWA07i8',
  authDomain: 'colorly-44942.firebaseapp.com',
  databaseURL: 'https://colorly-44942.firebaseio.com',
  projectId: 'colorly-44942',
  storageBucket: 'colorly-44942.appspot.com',
  messagingSenderId: '259290099771'
});

const db = firebase.database(app);

export const database = firebase.database();
export const storage = firebase.storage();
export const rebase = Rebase.createClass(db);
export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const twitterAuth = new firebase.auth.TwitterAuthProvider();
export const databaseRef = database.ref().child('users');
export const storageRef = storage.ref().child('users');
export const demoRef = database.ref().child('demo');
