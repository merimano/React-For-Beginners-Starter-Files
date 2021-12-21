import Rebase from 're-base';
import firebase from 'firebase';


// create a firebase app.
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyB1ueCg-2aSzCefqLa8pt6ZVruPiaAmzI8",
        authDomain: "catch-of-the-day-meriem.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-meriem-default-rtdb.europe-west1.firebasedatabase.app",
})

// create the Rebase bindings.
const base = Rebase.createClass(firebaseApp.database());

//export above with a named export
export {firebaseApp};

//export through default export, allows to bring it into other files.
export default base;
