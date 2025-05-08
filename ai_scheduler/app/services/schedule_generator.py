import pandas as pd
from joblib import load
from .professor_selector import select_professor
from .room_allocator import allocate_room
from sklearn.preprocessing import LabelEncoder

def generate_schedule(votes_file, workload_file, rooms_file):
    # Select the best professor and room
    module_id = "M101"  # You can modify this based on your logic
    best_professor = select_professor(votes_file, workload_file, module_id)
    best_room = allocate_room(rooms_file, required_capacity=30, needs_projector=True, needs_computer=True)

    professor_id = best_professor  # This is now a string like 'P001'
    room_id = best_room  # You should make sure room_id is from your room allocator

    #  Load the model and encoders
    model = load("app/models/time_slot_model.joblib")
    le_prof = load("app/models/le_prof.joblib")
    le_room = load("app/models/le_room.joblib")
    le_slot = load("app/models/le_slot.joblib")

    #  Ensure the LabelEncoder for professors is fitted on all possible professor IDs
    df = pd.read_csv("data/room_schedule.csv")  # Assuming this CSV has all professor_ids
    all_professor_ids = df["professor_id"].unique().tolist() + ["UNKNOWN"]  # Adding "UNKNOWN" label
    le_prof.fit(all_professor_ids)  # Fit the encoder to the complete dataset + "UNKNOWN"

    #  Encode professor and room
    try:
        prof_enc = le_prof.transform([professor_id])
    except ValueError:  # In case 'professor_id' is unseen
        print(f"Warning: Professor ID {professor_id} not found in training data. Assigning default encoding.")
        prof_enc = le_prof.transform(["UNKNOWN"])  # Now, "UNKNOWN" is a valid label

    room_enc = le_room.transform([room_id])

    #  Predict time slot
    slot_pred = model.predict([[prof_enc[0], room_enc[0]]])
    time_slot = le_slot.inverse_transform(slot_pred)[0]

    #  Build schedule data
    schedule_data = {
        "course_id": "C101",  # You can pass this as a parameter
        "module_id": "M101",
        "professor_id": professor_id,
        "room_id": room_id,
        "time_slot": time_slot
    }

    # Save to CSV
    schedule_df = pd.DataFrame([schedule_data])
    schedule_df.to_csv("data/schedule.csv", index=False)

    return schedule_data
