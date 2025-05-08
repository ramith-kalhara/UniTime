package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.UserVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserVoteRepository extends JpaRepository<UserVote, Long> {
    @Query("SELECT uv.professor.id FROM UserVote uv WHERE uv.vote.id = :voteId GROUP BY uv.professor.id ORDER BY COUNT(uv.id) DESC")
    List<Long> findTopVotedProfessorByVoteId(@Param("voteId") Long voteId);

}
