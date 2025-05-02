package com.UniTime.UniTime.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;
    private String course_id;

    // Mapping to professors
    @ManyToMany
    @JoinTable(
            name = "vote_professor",
            joinColumns = @JoinColumn(name = "vote_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private Set<Professor> professors = new HashSet<>();

    // Mapping to user
    @ManyToMany(mappedBy = "votes")
    private Set<User> users = new HashSet<>();



    // You can also add other fields and methods if necessary
}
