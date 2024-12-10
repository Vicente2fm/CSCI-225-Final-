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
    room1: 1,
    room2: 0,
    room3: 2,
    room4: 0,
    room5: 5,
    finalRoom: 0
};
let startTime = null;
let endTime = null;

let roomEntryTime = null;
let roomTimerInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    // Ensure room1 entry is recorded when the page loads
    if (document.body.id === 'room1') {
        recordRoomEntry('room1');
    }
    // Check if it's the final room, then display total time
    if (document.body.id === 'finalRoom') {
        displayTotalTimeInFinalRoom();
    }
});

function recordRoomEntry(room) {
    // Clear previous interval if one is running
    if(room === "room1"){
        startTime = new Date();
        console.log(startTime);
    }
    
    


    if (roomTimerInterval) {
        clearInterval(roomTimerInterval);
    }

    roomEntryTime = new Date();  // Store the time when the user enters the room
    roomTimerInterval = setInterval(() => {
        const timeNow = new Date();
        timeSpent[room] = (timeNow - roomEntryTime) / 1000;  // Calculate time spent in the room (in seconds)

        // Update the time in room
        const timeElement = document.getElementById('timeSpentCurrentRoom');
        if (timeElement) {
            timeElement.textContent = `${timeSpent[room].toFixed(2)} seconds`;  // Display time to 2 decimal places
        }

        console.log(`Time in ${room}: ${timeSpent[room].toFixed(2)} seconds`);  // Debugging line
    }, 1000);
    console.log(`Entered ${room} at: ${roomEntryTime.toLocaleTimeString()}`);
}

function recordRoomCompletion(room) {
    if (roomEntryTime) {
        clearInterval(roomTimerInterval);  // Stop the interval to prevent further time counting
        const roomExitTime = new Date();
        const timeDiff = (roomExitTime - roomEntryTime) / 1000;  // Time spent in seconds
        timeSpent[room] += timeDiff;
        roomEntryTime = null;  // Reset entry time to avoid using outdated timestamps
        roomTimerInterval = null;  // Ensure that the interval is reset
        console.log(`Time spent in ${room}: ${timeSpent[room].toFixed(2)} seconds`);
        console.log(`Time spent in room1: ${timeSpent["room1"].toFixed(2)} seconds`);
    }
}

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
        recordRoomCompletion('room1');
    }
}

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
        recordRoomCompletion('room3');
    } else {
        alert('Incorrect sequence. Try again!');
        resetButtons();
        userSequence = [];
        document.getElementById('resultMessage').textContent = 'Wrong sequence, please try again.';
    }
}

function resetButtons() {
    document.querySelectorAll('button[data-color]').forEach(button => {
        button.classList.remove('selected');
    });
}

let randomNumber = Math.floor(Math.random() * 20) + 1;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value, 10);
    const feedbackMessage = document.getElementById('feedbackMessage');
    if (isNaN(guess) || guess < 1 || guess > 20) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 20.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    } else if (guess === randomNumber) {
        feedbackMessage.textContent = "Correct! You guessed the right number.";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "success";
        roomCompletionStatus.room4 = true;
        document.getElementById('nextRoom').disabled = false;
        recordRoomCompletion('room4');
    } else {
        feedbackMessage.textContent =
            guess < randomNumber ? "Too low. Try again!" : "Too high. Try again!";
        feedbackMessage.style.display = "block";
        feedbackMessage.className = "error";
    }
}

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

function goToNextRoom() {
    for (let room in roomCompletionStatus) {
        if (roomCompletionStatus[room]) {
            const nextRoomIndex = Object.keys(roomCompletionStatus).indexOf(room) + 1;
            const nextRoom = Object.keys(roomCompletionStatus)[nextRoomIndex];
            if (nextRoom) {
                recordRoomCompletion(room);  // Ensure current room is marked complete before proceeding
                recordRoomEntry(nextRoom);  // Start timer for the next room
                window.location.href = `${nextRoom}.html`;  // Navigate to the next room
                return;
            }
        }
    }
    alert('You must solve the puzzles before proceeding!');
}

function restartGame() {
    if (confirm('Are you sure you want to restart the game? All progress will be lost.')) {
        for (let room in roomCompletionStatus) {
            roomCompletionStatus[room] = false;
        }
        for (let room in timeSpent) {
            timeSpent[room] = 0;
        }
        inventory = [];
        randomNumber = Math.floor(Math.random() * 10) + 1;
        window.location.href = "room1.html";
    }
}

function displayTimeSummary() {
    let summary = 'Time spent in each room:\n';
    for (let room in timeSpent) {
        summary += `${room}: ${timeSpent[room].toFixed(2)} seconds\n`;
    }
    alert(summary);
}

// Calculate total time spent in all rooms
function calculateTotalTime() {
    let totalTime = 0;
    for (let room in timeSpent) {
        console.log(timeSpent[room]);
        totalTime += timeSpent[room];
    }
    return totalTime;
}

// Function to display total time in final room
function displayTotalTimeInFinalRoom() {
    console.log("Displaying Final");
    endTime = new Date();
    console.log(endTime);
    total = (endTime-startTime)/1000;
    console.log(total.toFixed(2));

    const totalTime = calculateTotalTime();
    const totalTimeElement = document.getElementById('totalTime');
    if (totalTimeElement) {
        totalTimeElement.textContent = `${totalTime.toFixed(2)} seconds`;
        console.log(totalTime.toFixed(2))
        //console.log(timeSpent) // Display total time
    } else {
        console.error('Total time element not found.');
    }
}
