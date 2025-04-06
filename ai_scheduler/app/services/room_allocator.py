import pandas as pd

def allocate_room(rooms_file, required_capacity):
    rooms_df = pd.read_csv(rooms_file)

    # Filter rooms by required capacity and availability
    available_rooms = rooms_df[rooms_df["capacity"] >= required_capacity]

    if available_rooms.empty:
        return None  # No room available

    # Select the room with the closest matching capacity
    best_room = available_rooms.sort_values(by="capacity").iloc[0]
    return best_room.to_dict()
