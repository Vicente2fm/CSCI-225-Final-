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
    const t = Number(calculateTotalTime());
    console.log("submitting: ",t);
    const fieldname = "timeTotal" + Math.floor(Math.random() * 10000); 
    //const f = {fieldname:t};
    db.collection('time').doc(user).set({
        [fieldname]: t
    });
}

async function getTimes(){
    console.log("geting");
    const out = document.getElementById('pastTimes');
    const user = localStorage.getItem('currUser');
    var docRef = db.collection("time").doc(user);

    docRef.get().then((doc) => {
    if (doc.exists) {
        let data = doc.data();
        var docString =`${data.timeTotal}`;

        out.innerText = "Previous attempts:\n " + docString;
        console.log("1 Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    console.log("2 document",doc.data());
    
}
    