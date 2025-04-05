import pandas as pd
from collections import Counter

def select_professor(votes_file, workload_file):
    # Load votes and workload data
    votes_df = pd.read_csv(votes_file)
    workload_df = pd.read_csv(workload_file)

    # Count votes per professor
    professor_votes = Counter(votes_df['professor_id'])

    # Convert to DataFrame
    vote_df = pd.DataFrame(professor_votes.items(), columns=['professor_id', 'vote_count'])

    # Merge with workload
    merged_df = vote_df.merge(workload_df, on="professor_id")

    # Select professor with most votes and least workload
    merged_df["score"] = merged_df["vote_count"] - merged_df["current_workload"]
    best_professor = merged_df.loc[merged_df["score"].idxmax()]

    return best_professor.to_dict()
