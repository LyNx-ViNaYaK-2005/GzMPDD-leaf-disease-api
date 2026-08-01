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

## 📁 Repository Structure

```text
gzmpdd-leaf-disease-api/
│
├── api/
│   ├── __init__.py                # Package marker
│   └── main.py                    # FastAPI routes, model initialization, StaticFiles mount
│
├── frontend/
│   ├── index.html                 # Main web UI layout with Canvas container
│   ├── style.css                  # Modern UI styles & layout rules
│   └── script.js                  # Frontend logic: Fetch API & HTML5 Canvas drawing
│
├── weights/
│   └── best_model_weights_246epochs.pt  # Trained YOLOv8 model weights
│
├── .gitignore                     # Git tracking exclusions
├── LICENSE                        # Open-source MIT License
├── README.md                      # Comprehensive project documentation
└── requirements.txt               # Dependencies required to run the API server

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, Uvicorn, PyTorch, Ultralytics (YOLOv8)
- **Frontend:** HTML5, CSS3, Modern JavaScript (Fetch API & Canvas API)
- **Deployment & Tooling:** Postman, Python 3.10+


