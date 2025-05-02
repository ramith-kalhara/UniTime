package com.UniTime.UniTime.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "votes")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "start_date", length = 10)
    private String start_date;

    @Column(name = "end_date", length = 10)
    private String end_date;

    @Column(name = "start_time", length = 8)
    private String start_time;

    @Column(name = "end_time", length = 8)
    private String end_time;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "course_id", length = 50)
    private String course_id;

    //  Many-to-Many with Professor
    @ManyToMany
    @JoinTable(
            name = "vote_professors",
            joinColumns = @JoinColumn(name = "vote_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private List<Professor> professors;

}
