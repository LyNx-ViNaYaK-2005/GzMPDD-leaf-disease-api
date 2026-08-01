const API_URL = "http://127.0.0.1:8000/api/v1/detect";

const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const fileName = document.getElementById("fileName");
const detectBtn = document.getElementById("detectBtn");
const loader = document.getElementById("loader");
const canvasWrapper = document.getElementById("canvasWrapper");
const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d");
const resultsCard = document.getElementById("resultsCard");
const detectionsList = document.getElementById("detectionsList");

let selectedFile = null;

uploadBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        fileName.textContent = selectedFile.name;
        detectBtn.disabled = false;
    }
});

detectBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    // UI Reset
    loader.classList.remove("hidden");
    canvasWrapper.classList.add("hidden");
    resultsCard.classList.add("hidden");
    detectionsList.innerHTML = "";

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        loader.classList.add("hidden");

        if (response.ok) {
            renderDetections(selectedFile, data.detections);
        } else {
            alert(data.detail || "Error analyzing image");
        }
    } catch (err) {
        loader.classList.add("hidden");
        alert("Failed to connect to backend server!");
    }
});

function renderDetections(file, detections) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        // Match canvas dimensions to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image on canvas
        ctx.drawImage(img, 0, 0);

        // Draw bounding boxes for each detection
        detections.forEach((det) => {
            const { x_min, y_min, x_max, y_max } = det.bounding_box;
            const width = x_max - x_min;
            const height = y_max - y_min;

            // Draw Box
            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = Math.max(2, img.width / 200); // Scale line width
            ctx.strokeRect(x_min, y_min, width, height);

            // Draw Label Background
            const label = `${det.class} (${(det.confidence * 100).toFixed(1)}%)`;
            ctx.font = `bold ${Math.max(14, img.width / 40)}px Arial`;
            const textWidth = ctx.measureText(label).width;
            
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(x_min, y_min - 25, textWidth + 10, 25);

            // Draw Label Text
            ctx.fillStyle = "#000000";
            ctx.fillText(label, x_min + 5, y_min - 7);

            // Append to List
            const li = document.createElement("li");
            li.innerHTML = `<strong>${det.class}</strong> — Confidence: ${(det.confidence * 100).toFixed(2)}%`;
            detectionsList.appendChild(li);
        });

        if (detections.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No diseases detected on leaf.";
            detectionsList.appendChild(li);
        }

        canvasWrapper.classList.remove("hidden");
        resultsCard.classList.remove("hidden");
    };
}