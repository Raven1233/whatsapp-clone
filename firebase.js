import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCfo1WD_SGvyNC_wkyviiO3tP_Dy6KsVXM",
    authDomain: "whatsapp-clone-c96be.firebaseapp.com",
    projectId: "whatsapp-clone-c96be",
    storageBucket: "whatsapp-clone-c96be.appspot.com",
    messagingSenderId: "972551512568",
    appId: "1:972551512568:web:e501967fb02346b508760d"
};

const app=!firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();

const db=app.firestore();
const auth=app.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};
