import librosa
import numpy as np

def extract_features(file_path):

    audio, sample_rate = librosa.load(file_path, duration=30)

    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)

    return np.mean(mfccs.T, axis=0)