document.addEventListener("DOMContentLoaded", () => {

    console.log("Script loaded");

    const predictButton = document.getElementById("predictBtn");
    const fileInput = document.getElementById("audioFile");
    const resultDiv = document.getElementById("result");

    if (!predictButton || !fileInput || !resultDiv) {
        console.error("HTML element not found. Check your IDs.");
        return;
    }

    predictButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if (fileInput.files.length === 0) {
            resultDiv.innerHTML =
                "<p style='color:red;'>Please choose an MP3 or WAV file.</p>";
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        resultDiv.innerHTML = "<p>Predicting...</p>";

        try {

            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Server returned an error.");
            }

            const data = await response.json();
resultDiv.innerHTML = `
    <h3>Prediction Result</h3>
    <p><strong>Genre:</strong> ${data.genre}</p>
    <p><strong>Confidence:</strong> ${data.confidence}</p>
`;

setTimeout(() => {
    console.log("100 seconds passed");
}, 1000000);
        } catch (error) {

            console.error(error);

            resultDiv.innerHTML = `
                <p style="color:red;">
                    Server error. Try again.
                </p>
            `;
        }

    });

});
// ----------------------
// MUSIC PLAYER
// ----------------------

const audioPlayer = document.getElementById("audioPlayer");
const coverImage = document.getElementById("coverImage");
const songTitle = document.getElementById("songTitle");
const playBtn = document.getElementById("playBtn");


function playSong(audio, title, image) {

    console.log("Playing:", audio);

    audioPlayer.src = audio;
    coverImage.src = image;
    songTitle.textContent = title;

    audioPlayer.play()
        .then(() => {
            console.log("Song started");
            playBtn.textContent = "⏸️";
        })
        .catch(err => {
            console.error("Audio Error:", err);
            alert("Cannot play audio. Check the console.");
        });
}

function togglePlay() {

    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = "⏸️";
    } else {
        audioPlayer.pause();
        playBtn.textContent = "▶️";
    }
}

audioPlayer.addEventListener("ended", () => {
    playBtn.textContent = "▶️";
});