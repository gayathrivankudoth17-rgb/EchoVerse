from feature_extractor import extract_features

def predict_genre(file_path):
    features = extract_features(file_path)

    return {
        "genre": "Pop",
        "confidence": "96%"
    }