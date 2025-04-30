import joblib

# Load model and encoders
model = joblib.load("app/models/time_slot_model.joblib")
le_prof = joblib.load("app/models/le_prof.joblib")
le_room = joblib.load("app/models/le_room.joblib")
le_slot = joblib.load("app/models/le_slot.joblib")

def predict_time_slot(professor_id, room_id):
    try:
        prof_enc = le_prof.transform([professor_id])[0]
        room_enc = le_room.transform([room_id])[0]
        slot_enc = model.predict([[prof_enc, room_enc]])[0]
        time_slot = le_slot.inverse_transform([slot_enc])[0]
        return time_slot
    except Exception as e:
        print("Prediction error:", e)
        return "Time TBD"
