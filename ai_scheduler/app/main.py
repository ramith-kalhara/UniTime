import pandas as pd
from services.professor_selector import select_professor
from services.room_allocator import allocate_room
from services.time_slot_predictor import predict_time_slot
from services.schedule_generator import generate_schedule


if __name__ == "__main__":
    result = generate_schedule(
        "data/votes.csv",
        "data/workload.csv",
        "data/rooms.csv"
    )

    print("✅ Schedule generated:")
    print(result)