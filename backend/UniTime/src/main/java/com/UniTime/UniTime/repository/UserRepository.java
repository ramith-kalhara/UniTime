package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can define custom queries if needed, for example:
    // Optional<User> findByEmail(String email);
}
