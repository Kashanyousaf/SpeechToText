const output = document.getElementById('output');
const startButton = document.getElementById('startButton');

let finalTranscript = "";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Corrected language code
recognition.interimResults = true;

startButton.addEventListener('click', () => {
    finalTranscript = '';
    output.textContent = '';
    recognition.start();
    startButton.textContent = 'Listening...';
});

recognition.addEventListener('result', (e) => { // Corrected event name
    const transcript = Array.from(e.results).map(result => result[0].transcript).join('');

    if (e.results[0].isFinal) {
        finalTranscript = transcript;
        output.textContent = finalTranscript;
    }
});

recognition.addEventListener('end', () => {
    startButton.textContent = 'Start Listening'; // Corrected button text reset
    recognition.start();
});

document.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        recognition.stop();
        startButton.textContent = 'Start Listening'; // Corrected button text reset
    }
});
