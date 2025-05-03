import pandas as pd

def allocate_room(rooms_file, required_capacity, needs_projector, needs_computer):
    rooms_df = pd.read_csv(rooms_file)

    # Filter rooms based on requirements
    suitable_rooms = rooms_df[
        (rooms_df["capacity"] >= required_capacity) &
        (rooms_df["has_projector"] == needs_projector) &
        (rooms_df["has_computer"] == needs_computer)
    ]

    if suitable_rooms.empty:
        return None

    # Select room with the smallest adequate capacity
    best_room = suitable_rooms.sort_values(by="capacity").iloc[0]
    return best_room["room_id"]
