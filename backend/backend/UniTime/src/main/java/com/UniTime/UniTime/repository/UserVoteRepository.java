package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.UserVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVoteRepository extends JpaRepository<UserVote, Long> {
}
