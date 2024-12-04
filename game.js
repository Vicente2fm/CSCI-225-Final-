let inventory = [];
let isRoom1Completed = false;
let isRoom2Completed = false;
let isRoom3Completed = false;
let isRoom4Completed = false;
let isRoom5Completed = false; // New flag for Room 5
let isFinalRoomCompleted = false; // Final room flag

// Room 1 Logic (unchanged from previous)
function inspectItem(item) {
    if (item === 'book') {
        alert('You found a clue in the book!');
        inventory.push('clue from book');
    } else if (item === 'key') {
        alert('You found a key!');
        inventory.push('key');
    }
    checkRoom1Completion();
}

function checkRoom1Completion() {
    if (inventory.includes('key') && inventory.includes('clue from book')) {
        isRoom1Completed = true;
        document.getElementById('nextRoom').disabled = false;
    }
}

function goToNextRoom() {
    if (isRoom1Completed) {
        window.location.href = "room2.html"; // Go to Room 2
    } else if (isRoom2Completed) {
        window.location.href = "room3.html"; // Go to Room 3
    } else if (isRoom3Completed) {
        window.location.href = "room4.html"; // Go to Room 4
    } else if (isRoom4Completed) {
        window.location.href = "room5.html"; // Go to Room 5
    } else if (isRoom5Completed) {
        window.location.href = "finalRoom.html"; // Go to Final Room
    } else if (isFinalRoomCompleted) {
        alert("You have already completed the game! Congratulations again!");
    } else {
        alert('You must solve the puzzles before proceeding!');
    }
}

// Room 2 Logic (unchanged from previous)
function inspectItemRoom2(item) {
    if (item === 'painting') {
        alert('There is a code hidden under the painting.');
        document.getElementById('hintMessage').textContent = "Hint: The code is the web development class number ";}
}

function unlockDoor() {
    const combination = document.getElementById('combinationInput').value;
    if (combination === '225') {  // Correct combination
        alert('The lock opens! You can now proceed to the next room.');
        isRoom2Completed = true;
        document.getElementById('nextRoom').disabled = false;
    } else {
        alert('Incorrect combination. Try again!');
    }
}

// Room 3 Logic
let colorSequence = ['red', 'white', 'blue']; // Correct color sequence
let userSequence = [];

function chooseColor(color) {
    userSequence.push(color);
    document.getElementById('currentSequence').textContent = userSequence.join(' -> ');
}

function checkColorSequence() {
    if (JSON.stringify(userSequence) === JSON.stringify(colorSequence)) {
        alert('Correct sequence! The door opens.');
        isRoom3Completed = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('resultMessage').textContent = 'Well done!';
    } else {
        alert('Incorrect sequence. Try again!');
        userSequence = []; // Resets the  sequence
        document.getElementById('resultMessage').textContent = 'Wrong sequence, please try again.';
    }
}

//room 4 logic 

// Room 5 Logic (unchanged from previous)
function checkMathAnswer() {
    const answer = parseInt(document.getElementById('mathAnswer').value);
    
    if (answer === -1) { 
        alert('Correct! The door opens.');
        isRoom5Completed = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('mathResultMessage').textContent = 'Well done! The door opens.';
    } else {
        alert('Incorrect answer. Try again!');
        document.getElementById('mathResultMessage').textContent = 'Wrong answer, please try again.';
    }
}

function restartGame() {

    isRoom1Completed = false;
    isRoom2Completed = false;
    isRoom3Completed = false;
    isRoom4Completed = false;
    isRoom5Completed = false;
    isFinalRoomCompleted = false;
    
   
    window.location.href = "room1.html"; // Redirect to the first room
}
