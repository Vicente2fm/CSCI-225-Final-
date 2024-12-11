const firebaseConfig = {
    apiKey: "AIzaSyB2dx3J_oBeEIDVXXsBytZeSew9G6GQC1s",
    authDomain: "csci-final-583ca.firebaseapp.com",
    projectId: "csci-final-583ca",
    storageBucket: "csci-final-583ca.firebasestorage.app",
    messagingSenderId: "283102873793",
    appId: "1:283102873793:web:d3a20c07a30620135b2c40",
    measurementId: "G-CHFDD3EMB9"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();



async function goToFirstRoom(){
    var audio = new Audio('images/Audio/click1.mp3');
    audio.play();
    await new Promise(r => setTimeout(r, 500)); //sleep 0.5s
    window.location.href = `room1.html`;  // Navigate to the next room
}
// Save the list to database
$('#save').click(function(){
    $(this).text("saving...");
    var value = $(this).text();
    db.collection('grocerylist').add({item:value});
});
data = {
    beans: "baked",
    flag: "checked",
    level: 2,
    nothing: null,
    beans: ["baked", "beans", "bacon"]
}
//db.collection('test').add(data); //{json format}



console.log("next room travel");
    

