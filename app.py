from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return "Music Genre Classifier Server is Running"

@app.route('/predict', methods=['POST'])
def predict():

    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files['file']

    if file.filename == "":
        return jsonify({
            "error": "No file selected"
        }), 400

    # Save the uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Temporary prediction
    return jsonify({
        "genre": "Pop",
        "confidence": "95%"
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)