import pandas as pd
from services.professor_selector import select_professor
from services.room_allocator import allocate_room

def generate_schedule(votes_file, workload_file, rooms_file):
    best_professor = select_professor(votes_file, workload_file)
    best_room = allocate_room(rooms_file, required_capacity=30)

    schedule_data = {
        "course_id": "CS101",
        "professor_id": best_professor["professor_id"],
        "professor_name": best_professor["professor_name"],
        "room_id": best_room["room_id"],
        "room_name": best_room["room_name"],
        "schedule_time": "Monday 10 AM - 12 PM"
    }

    # Save schedule to CSV
    schedule_df = pd.DataFrame([schedule_data])
    schedule_df.to_csv("data/schedule.csv", index=False)

    return schedule_data
