// Shared Inventory and Room Completion Status
let inventory = [];
const roomCompletionStatus = {
    room1: false,
    room2: false,
    room3: false,
    room4: false,
    room5: false,
    finalRoom: false,
};

// Reset Button Highlights on Load
function resetButtons() {
    document.querySelectorAll('button[data-color]').forEach(button => {
        button.classList.remove('selected');
    });
}

// Room 4 Logic (Number Guessing Game)
let randomNumber = Math.floor(Math.random() * 10) + 1; // Random number for Room 4

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value, 10);
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Validate input and provide feedback
    if (isNaN(guess) || guess < 1 || guess > 10) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 10.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error"; // Error feedback style
    } else if (guess === randomNumber) {
        feedbackMessage.textContent = "Correct! You guessed the right number.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "success"; // Success feedback style
        roomCompletionStatus.room4 = true;
        document.getElementById('nextRoom').disabled = false; // Enable Next Room button
    } else {
        feedbackMessage.textContent =
            guess < randomNumber ? "Too low. Try again!" : "Too high. Try again!";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error"; // Error feedback style
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
        // Reset all room completions
        for (let room in roomCompletionStatus) {
            roomCompletionStatus[room] = false;
        }

        // Reset inventory and UI
        inventory = [];
        window.location.href = "room1.html";
    }
}
