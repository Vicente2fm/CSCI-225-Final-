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

window.addEventListener("load", myInit, true); function myInit(){
    submitTime();
    getTimes();
}; 

function submitTime(){
    console.log("submiting");

    const user = localStorage.getItem('currUser');
    const t = calculateTotalTime();
    console.log("submitting: ",t);
    db.collection('time').doc(user).set({
        'timeTotal': t
    });
}

function getTimes(){
    console.log("geting");
}
    