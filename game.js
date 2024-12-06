let inventory = [];
let isRoom1Completed = false;
let isRoom2Completed = false;
let isRoom3Completed = false;
let isRoom4Completed = false;
let isRoom5Completed = false;
let isFinalRoomCompleted = false;

// Room 1 Logic
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

// Room 3 Logic (Color Sequence)
let colorSequence = ['red', 'white', 'blue'];
let userSequence = [];

function chooseColor(color) {
    userSequence.push(color);
    document.getElementById('currentSequence').textContent = userSequence.join(' -> ');

    // Add visual feedback (optional)
    const button = document.querySelector(`button[data-color="${color}"]`);
    if (button) button.classList.add('selected');
}

function checkColorSequence() {
    if (JSON.stringify(userSequence) === JSON.stringify(colorSequence)) {
        alert('Correct sequence! The door opens.');
        isRoom3Completed = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('resultMessage').textContent = 'Well done!';
    } else {
        alert('Incorrect sequence. Try again!');
        userSequence = []; // Reset the sequence
        document.getElementById('resultMessage').textContent = 'Wrong sequence, please try again.';
    }
}

// Room 4 Logic (Number Guessing Game)
let randomNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 10.";
        feedbackMessage.style.color = "red";
    } else if (guess === randomNumber) {
        feedbackMessage.textContent = "Correct! You guessed the right number.";
        feedbackMessage.style.color = "green";
        isRoom4Completed = true;
        document.getElementById('nextRoom').disabled = false;
    } else if (guess < randomNumber) {
        feedbackMessage.textContent = "Too low. Try again!";
        feedbackMessage.style.color = "orange";
    } else {
        feedbackMessage.textContent = "Too high. Try again!";
        feedbackMessage.style.color = "orange";
    }
}

// Room 5 Logic (Math Answer)
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

// General Navigation Logic (for all rooms)
function goToNextRoom() {
    if (isRoom1Completed) {
        window.location.href = "room2.html";
    } else if (isRoom2Completed) {
        window.location.href = "room3.html";
    } else if (isRoom3Completed) {
        window.location.href = "room4.html";
    } else if (isRoom4Completed) {
        window.location.href = "room5.html";
    } else if (isRoom5Completed) {
        window.location.href = "finalRoom.html";
    } else if (isFinalRoomCompleted) {
        alert("You have already completed the game! Congratulations again!");
    } else {
        alert('You must solve the puzzles before proceeding!');
    }
}

// Restart Game
function restartGame() {
    if (confirm('Are you sure you want to restart the game? All progress will be lost.')) {
        isRoom1Completed = false;
        isRoom2Completed = false;
        isRoom3Completed = false;
        isRoom4Completed = false;
        isRoom5Completed = false;
        isFinalRoomCompleted = false;

        window.location.href = "room1.html";
    }
}
