import pandas as pd

def select_professor(votes_file, workload_file, module_id):
    votes_df = pd.read_csv(votes_file)
    workload_df = pd.read_csv(workload_file)

    # Filter votes for the given module
    module_votes = votes_df[votes_df["module_id"] == module_id]

    # Count votes per professor
    vote_counts = module_votes["professor_id"].value_counts().reset_index()
    vote_counts.columns = ["professor_id", "vote_count"]

    # Merge with workload
    merged = pd.merge(vote_counts, workload_df, on="professor_id")

    # Calculate score: higher votes and lower workload preferred
    merged["score"] = merged["vote_count"] / (merged["current_workload"] + 1)

    # Select professor with highest score
    best_professor = merged.sort_values(by="score", ascending=False).iloc[0]
    return best_professor["professor_id"]
