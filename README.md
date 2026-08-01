# 🍃 GzMPDD - Plant Leaf Disease Detection REST API

A full-stack, real-time plant disease detection application built with **FastAPI**, **YOLOv8n**, and **HTML5 Canvas**. This API deploys the model developed under the **GzMPDD** (Generalizable Model for Plant Disease Detection) research methodology.

> 💡 **Model & Research Base:** The model weights (`best_model_weights_246epochs.pt`) and dual-dataset generalization strategy used here were trained and evaluated in the primary research repository: [Generalised Plant Disease Detection Model](https://github.com/LyNx-ViNaYaK-2005/Generalised-Plant-Disease-Detection-using-YOLOv8n).

---

## 📌 Key Features

- **Real-Time Detection:** Fast object detection using a lightweight YOLOv8n engine trained over 246 epochs.
- **RESTful Endpoint:** `POST /api/v1/detect` accepts leaf images and returns JSON payloads with class labels, confidence scores, and bounding box coordinates.
- **Interactive Web UI:** HTML5 Canvas interface that accepts image uploads and draws predicted bounding boxes live in the browser.
- **Cross-Species Generalization:** Supports detection across 12 plant diseases and 7 crop species using a dual-dataset mapping approach.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, Uvicorn, PyTorch, Ultralytics (YOLOv8)
- **Frontend:** HTML5, CSS3, Modern JavaScript (Fetch API & Canvas API)
- **Deployment & Tooling:** Postman, Python 3.10+
