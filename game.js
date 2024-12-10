let inventory = [];
const roomCompletionStatus = {
    room1: false,
    room2: false,
    room3: false,
    room4: false,
    room5: false,
    finalRoom: false
};

const timeSpent = {
    room1: 0,
    room2: 0,
    room3: 0,
    room4: 0,
    room5: 0,
    finalRoom: 0
};

let roomEntryTime = null;
let roomTimerInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    // Ensure room1 entry is recorded when the page loads
    recordRoomEntry('room1');
});

function recordRoomEntry(room) {
    roomEntryTime = new Date();
    roomTimerInterval = setInterval(() => {
        const timeNow = new Date();
        timeSpent[room] = (timeNow - roomEntryTime) / 1000;
        
        // Update the time in room
        const timeElement = document.getElementById('timeSpentCurrentRoom');
        if (timeElement) {
            timeElement.textContent = `${timeSpent[room].toFixed(2)} seconds`;
        }

        console.log(`Time in ${room}: ${timeSpent[room].toFixed(2)} seconds`); // Debugging line
    }, 1000);
    console.log(`Entered ${room} at: ${roomEntryTime.toLocaleTimeString()}`);
}

function recordRoomCompletion(room) {
    if (roomEntryTime) {
        clearInterval(roomTimerInterval);
        const roomExitTime = new Date();
        const timeDiff = (roomExitTime - roomEntryTime) / 1000;
        timeSpent[room] += timeDiff;
        roomEntryTime = null;
        console.log(`Time spent in ${room}: ${timeDiff.toFixed(2)} seconds`);
    }
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value, 10);  // Make sure value is treated as a base 10 number
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    // Check if the guess is valid
    if (isNaN(guess) || guess < 1 || guess > 20) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 20.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    } else if (guess === randomNumber) {
        // Correct guess
        feedbackMessage.textContent = "Correct! You guessed the right number.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "success";
        
        // Update room completion status for room4
        roomCompletionStatus.room4 = true;
        document.getElementById('nextRoom').disabled = false;  // Enable the 'nextRoom' button
        recordRoomCompletion('room4');  // Record room completion and time
    } else {
        // Incorrect guess
        feedbackMessage.textContent = guess < randomNumber ? "Too low. Try again!" : "Too high. Try again!";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    }
}

// Ensuring other functions like checkMathAnswer, etc., are working correctly

function checkMathAnswer() {
    const answer = parseInt(document.getElementById('mathAnswer').value);
    if (answer === 24) {
        alert('Correct! The door opens.');
        roomCompletionStatus.room5 = true;
        document.getElementById('nextRoom').disabled = false;
        document.getElementById('mathResultMessage').textContent = 'Well done! The door opens.';
        recordRoomCompletion('room5');
    } else {
        alert('Incorrect answer. Try again!');
        document.getElementById('mathResultMessage').textContent = 'Wrong answer, please try again.';
    }
}

// Go to the next room
function goToNextRoom() {
    for (let room in roomCompletionStatus) {
        if (roomCompletionStatus[room]) {
            const nextRoomIndex = Object.keys(roomCompletionStatus).indexOf(room) + 1;
            const nextRoom = Object.keys(roomCompletionStatus)[nextRoomIndex];
            if (nextRoom) {
                recordRoomEntry(nextRoom);
                window.location.href = `${nextRoom}.html`;
                return;
            }
        }
    }
    alert('You must solve the puzzles before proceeding!');
}

// Reset the game
function restartGame() {
    if (confirm('Are you sure you want to restart the game? All progress will be lost.')) {
        for (let room in roomCompletionStatus) {
            roomCompletionStatus[room] = false;
        }
        for (let room in timeSpent) {
            timeSpent[room] = 0;
        }
        inventory = [];
        randomNumber = Math.floor(Math.random() * 20) + 1;  // Reset random number for next game
        window.location.href = "room1.html";  // Restart at room1
    }
}

// Calculate total time spent in all rooms
function calculateTotalTime() {
    let totalTime = 0;
    for (let room in timeSpent) {
        totalTime += timeSpent[room];
    }
    return totalTime;
}

// Function to display total time in final room
function displayTotalTimeInFinalRoom() {
    const totalTime = calculateTotalTime();
    document.getElementById('totalTime').textContent = `${totalTime.toFixed(2)} seconds`;
}
