package com.UniTime.UniTime.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "votes") // Naming the table explicitly
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "start_date", length = 10)
    private String start_date; // Format: YYYY-MM-DD

    @Column(name = "end_date", length = 10)
    private String end_date; // Format: YYYY-MM-DD

    @Column(name = "start_time", length = 8)
    private String start_time; // Format: HH:mm:ss

    @Column(name = "end_time", length = 8)
    private String end_time; // Format: HH:mm:ss

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // Detailed vote description

    @Column(name = "module_id", length = 50)
    private String module_id; // Associated module ID

    @Column(name = "professor_id", length = 50)
    private String professor_id; // Voted professor ID
}
