import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load training data
df = pd.read_csv("data/room_schedule.csv")

# Encode categorical variables
le_prof = LabelEncoder()
le_room = LabelEncoder()
le_slot = LabelEncoder()

df["professor_enc"] = le_prof.fit_transform(df["professor_id"])
df["room_enc"] = le_room.fit_transform(df["room_id"])
df["slot_enc"] = le_slot.fit_transform(df["preferred_time_slot"])

X = df[["professor_enc", "room_enc"]]
y = df["slot_enc"]

# Train the model
model = LogisticRegression(max_iter=200)
model.fit(X, y)

# Save the model and encoders
model_dir = "app/models"
os.makedirs(model_dir, exist_ok=True)
joblib.dump(model, f"{model_dir}/time_slot_model.joblib")
joblib.dump(le_prof, f"{model_dir}/le_prof.joblib")
joblib.dump(le_room, f"{model_dir}/le_room.joblib")
joblib.dump(le_slot, f"{model_dir}/le_slot.joblib")

print("✅ Time slot model trained and saved.")
