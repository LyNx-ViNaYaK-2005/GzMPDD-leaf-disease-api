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

## 📜 Research Reference

If you find this work or API implementation helpful, please reference our underlying research paper:

```bibtex
@article{azmi2025gzmpdd,
  title     = {AI-based Generalizable Model (GzMPDD) to Detect Plant Leaf Disease Using YOLOv8n},
  author    = {Azmi, Samiul Haque and Sharma, Vinayak and Agarwala, Preksha and Priya and Dixit, Shorya and Bhatia, Vishal Singh},
  journal   = {School of Computer Science and Engineering, Vellore Institute of Technology Bhopal University},
  year      = {2025},
  note      = {Evaluated on 19 classes across 7 plant species and 12 diseases using a dual-dataset mapping approach}
}
