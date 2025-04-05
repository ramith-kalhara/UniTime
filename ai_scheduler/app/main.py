from services.schedule_generator import generate_schedule

if __name__ == "__main__":
    # File paths
    votes_file = "data/votes.csv"
    workload_file = "data/workload.csv"
    rooms_file = "data/rooms.csv"

    # Generate Schedule
    schedule = generate_schedule(votes_file, workload_file, rooms_file)

    print("\n✅ AI-Generated Schedule:")
    print(schedule)

    print("\n📂 Schedule saved in 'data/schedule.csv'!")
