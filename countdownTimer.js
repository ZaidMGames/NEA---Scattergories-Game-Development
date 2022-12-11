function countdownTimer(seconds) {
    // Calculate the end time
    let endTime = Date.now() + seconds * 1000;

    // Loop until the current time is greater than or equal to the end time
    while (Date.now() < endTime) {
        // Calculate the number of seconds remaining
        let secondsRemaining = Math.round((endTime - Date.now()) / 1000);

        // Display the number of seconds remaining
        console.log(secondsRemaining);

        // Pause for one second
        new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Display a message indicating that the countdown has finished
    console.log("Countdown finished!");
}

countdownTimer(10);