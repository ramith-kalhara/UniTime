from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load model and encoders
MODEL_DIR = "models"
model = joblib.load(os.path.join(MODEL_DIR, "time_slot_model.joblib"))
le_prof = joblib.load(os.path.join(MODEL_DIR, "le_prof.joblib"))
le_room = joblib.load(os.path.join(MODEL_DIR, "le_room.joblib"))
le_slot = joblib.load(os.path.join(MODEL_DIR, "le_slot.joblib"))

@app.route("/predict-time-slot", methods=["POST"])
def predict_time_slot():
    data = request.get_json()

    try:
        professor_id = data["professor_id"]
        room_id = data["room_id"]

        # Encode inputs with a fallback for unseen labels
        try:
            professor_enc = le_prof.transform([professor_id])[0]
        except ValueError:
            return jsonify({"error": f"Unseen professor_id: {professor_id}"}), 400
        
        try:
            room_enc = le_room.transform([room_id])[0]
        except ValueError:
            return jsonify({"error": f"Unseen room_id: {room_id}"}), 400

        # Predict
        pred = model.predict([[professor_enc, room_enc]])[0]

        # Decode prediction
        time_slot = le_slot.inverse_transform([pred])[0]

        return jsonify({"time_slot": time_slot})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
