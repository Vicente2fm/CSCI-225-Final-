let inventory = [];
const roomCompletionStatus = {
    room1: false,
    room2: false,
    room3: false,
    room4: false,
    room5: false,
    finalRoom: false
};

// Room 1 Logic
function inspectItem(item) {
    if (item === 'book') {
        alert('You found a clue in the book!');
        inventory.push('clue from book');
    } else if (item === 'key') {
        alert('You found a key!');
        inventory.push('key');
    }
    checkRoomCompletion('room1');
}

function checkRoomCompletion(room) {
    if (room === 'room1' && inventory.includes('key') && inventory.includes('clue from book')) {
        roomCompletionStatus.room1 = true;
        document.getElementById('nextRoom').disabled = false;
    }
}

// Room 3 Logic (Color Sequence)
let colorSequence = ['red', 'white', 'blue'];
let userSequence = [];

function chooseColor(color) {
    userSequence.push(color);
    document.getElementById('currentSequence').textContent = userSequence.join(' -> ');

    const button = document.querySelector(`button[data-color="${color}"]`);
    if (button) {
        button.classList.add('selected');
    }
}

function checkColorSequence() {
    if (JSON.stringify(userSequence) === JSON.stringify(colorSequence)) {
        alert('Correct sequence! The door opens.');
        roomCompletionStatus.room3 = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('resultMessage').textContent = 'Well done!';
    } else {
        alert('Incorrect sequence. Try again!');
        userSequence = [];
        document.getElementById('resultMessage').textContent = 'Wrong sequence, please try again.';
    }
}

// Reset button highlights on load
function resetButtons() {
    document.querySelectorAll('button[data-color]').forEach(button => {
        button.classList.remove('selected');
    });
}

// Room 4 Logic (Number Guessing Game)
let randomNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value, 10);
    const feedbackMessage = document.getElementById('feedbackMessage');

    if (isNaN(guess) || guess < 1 || guess > 10) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 10.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    } else if (guess === randomNumber) {
        feedbackMessage.textContent = "Correct! You guessed the right number.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "success";
        roomCompletionStatus.room4 = true;
        document.getElementById('nextRoom').disabled = false;
    } else {
        feedbackMessage.textContent =
            guess < randomNumber ? "Too low. Try again!" : "Too high. Try again!";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    }
}

// Room 5 Logic (Math Answer)
function checkMathAnswer() {
    const answer = parseInt(document.getElementById('mathAnswer').value);

    if (answer === -1) {
        alert('Correct! The door opens.');
        roomCompletionStatus.room5 = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('mathResultMessage').textContent = 'Well done! The door opens.';
    } else {
        alert('Incorrect answer. Try again!');
        document.getElementById('mathResultMessage').textContent = 'Wrong answer, please try again.';
    }
}

// General Navigation Logic
function goToNextRoom() {
    for (let room in roomCompletionStatus) {
        if (roomCompletionStatus[room]) {
            const nextRoomIndex = Object.keys(roomCompletionStatus).indexOf(room) + 1;
            const nextRoom = Object.keys(roomCompletionStatus)[nextRoomIndex];

            if (nextRoom) {
                window.location.href = `${nextRoom}.html`;
                return;
            }
        }
    }
    alert('You must solve the puzzles before proceeding!');
}

// Restart Game
function restartGame() {
    if (confirm('Are you sure you want to restart the game? All progress will be lost.')) {
        for (let room in roomCompletionStatus) {
            roomCompletionStatus[room] = false;
        }
        inventory = [];
        window.location.href = "room1.html";
    }
}
