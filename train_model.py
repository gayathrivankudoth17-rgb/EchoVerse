import os
import librosa
import numpy as np
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X=[]
y=[]

DATASET="dataset"

for genre in os.listdir(DATASET):

    folder=os.path.join(DATASET,genre)

    if not os.path.isdir(folder):
        continue

    for song in os.listdir(folder):

        path=os.path.join(folder,song)

        try:

            audio,sr=librosa.load(path,duration=30)

            mfcc=librosa.feature.mfcc(
                y=audio,
                sr=sr,
                n_mfcc=40
            )

            feature=np.mean(mfcc.T,axis=0)

            X.append(feature)

            y.append(genre)

        except:
            pass

X=np.array(X)

X_train,X_test,y_train,y_test=train_test_split(
X,
y,
test_size=0.2,
random_state=42
)

model=RandomForestClassifier()

model.fit(X_train,y_train)

print("Accuracy:",model.score(X_test,y_test))

joblib.dump(model,"model/genre_model.pkl")

print("Model Saved Successfully")