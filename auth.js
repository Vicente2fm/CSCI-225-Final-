const firebaseConfig = {
    apiKey: "AIzaSyB2dx3J_oBeEIDVXXsBytZeSew9G6GQC1s",
    authDomain: "csci-final-583ca.firebaseapp.com",
    projectId: "csci-final-583ca",
    storageBucket: "csci-final-583ca.firebasestorage.app",
    messagingSenderId: "283102873793",
    appId: "1:283102873793:web:d3a20c07a30620135b2c40",
    measurementId: "G-CHFDD3EMB9"
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);

//Login using popup

$('#login').submit(function (e) {
    console.log("Submit clicked");
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
    // ...
    console.log(user);
    
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
    });
    console.log("next room travel");
    
});
