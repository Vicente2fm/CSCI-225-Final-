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
        alert('There seems to be a code hidden under the painting.');
        document.getElementById('hintMessage').textContent = "Hint: The code is a four-digit number.";
    } else if (item === 'lock') {
        alert('The lock looks like it needs a code to open.');
    }
}

function unlockDoor() {
    const combination = document.getElementById('combinationInput').value;
    if (combination === '1234') {  // Correct combination
        alert('The lock opens! You can now proceed to the next room.');
        isRoom2Completed = true;
        document.getElementById('nextRoom').disabled = false;
    } else {
        alert('Incorrect combination. Try again!');
    }
}

// Room 3 Logic (unchanged from previous)
let colorSequence = ['red', 'blue', 'green']; // Correct color sequence
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
        document.getElementById('resultMessage').textContent = 'Well done! You have solved the color puzzle!';
    } else {
        alert('Incorrect sequence. Try again!');
        document.getElementById('resultMessage').textContent = 'Wrong sequence, please try again.';
    }
}

// Room 4 Logic (unchanged from previous)
function checkRiddleAnswer() {
    const answer = document.getElementById('riddleAnswer').value.trim().toLowerCase();
    
    if (answer === "echo") {  // Correct answer to the riddle
        alert('Correct! The stone door opens.');
        isRoom4Completed = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('riddleResultMessage').textContent = 'Well done! The door opens.';
    } else {
        alert('Incorrect answer. Try again!');
        document.getElementById('riddleResultMessage').textContent = 'Wrong answer, please try again.';
    }
}

// Room 5 Logic (unchanged from previous)
function checkMathAnswer() {
    const answer = parseInt(document.getElementById('mathAnswer').value);
    
    if (answer === 72) {  // Correct math answer to the equation "45 + 27"
        alert('Correct! The door opens.');
        isRoom5Completed = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('mathResultMessage').textContent = 'Well done! The door opens.';
    } else {
        alert('Incorrect answer. Try again!');
        document.getElementById('mathResultMessage').textContent = 'Wrong answer, please try again.';
    }
}

// Final Room Logic (congratulations)
function restartGame() {
    // Reset all game flags to start over
    isRoom1Completed = false;
    isRoom2Completed = false;
    isRoom3Completed = false;
    isRoom4Completed = false;
    isRoom5Completed = false;
    isFinalRoomCompleted = false;
    
    alert('Thanks for playing! The game will now restart.');
    window.location.href = "room1.html"; // Redirect to the first room
}
