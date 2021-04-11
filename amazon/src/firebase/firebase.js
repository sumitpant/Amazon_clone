import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCdL9bDAvmuqMsDfmlp8GtqTwWGTSQJg9g",
    authDomain: "clone-5d82c.firebaseapp.com",
    projectId: "clone-5d82c",
    storageBucket: "clone-5d82c.appspot.com",
    messagingSenderId: "825519039727",
    appId: "1:825519039727:web:baa31db6133f2f9223671a"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  const auth=firebase.auth();

  export{
    db,auth
  };