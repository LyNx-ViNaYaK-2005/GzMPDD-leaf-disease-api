import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ultralytics import YOLO

# 1. Initialize FastAPI Application
app = FastAPI(
    title="GzMPDD Plant Disease Detection API",
    description="Real-time plant leaf disease detection using YOLOv8n",
    version="1.0.0"
)

# Allow cross-origin requests from any frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load the YOLOv8 Model (Loads once at startup)
# Ensure the path matches where you place your .pt file
MODEL_PATH = "../weights/best_model_weights_246epochs.pt"
try:
    model = YOLO(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")

# 3. Define the Inference Endpoint
@app.post("/api/v1/detect")
async def detect_disease(file: UploadFile = File(...)):
    # Validate by extension or content_type
    allowed_extensions = (".jpg", ".jpeg", ".png", ".webp")
    is_valid_type = file.content_type and file.content_type.startswith("image/")
    is_valid_ext = file.filename.lower().endswith(allowed_extensions)

    if not (is_valid_type or is_valid_ext):
        raise HTTPException(status_code=400, detail="File must be an image (.jpg, .png, etc.).")

    try:
        # Read the image bytes and convert to PIL Image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Run inference (imgsz=640)
        results = model.predict(image, imgsz=640, conf=0.25)
        
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                confidence = float(box.conf[0])
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                
                detections.append({
                    "class": class_name,
                    "confidence": round(confidence, 4),
                    "bounding_box": {
                        "x_min": round(x1, 2),
                        "y_min": round(y1, 2),
                        "x_max": round(x2, 2),
                        "y_max": round(y2, 2)
                    }
                })
        
        return {
            "filename": file.filename,
            "status": "success",
            "total_detections": len(detections),
            "detections": detections
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "API and YOLOv8 Model are running!"}