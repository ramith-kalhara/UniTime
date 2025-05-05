package com.UniTime.UniTime.entity;
import com.UniTime.UniTime.dto.ProfessorDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "professor")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "full_name", nullable = false)
    private String full_name;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "tp_num", nullable = false)
    private String tp_num;
    @Column(name = "department_name", nullable = false)
    private String department_name;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "country", nullable = false)
    private String country;
    @Column(name = "postal_code", nullable = false)
    private String postal_code;
    @Column(name = "module_id")
    private String module_id;
    @Column(name = "module_code", nullable = false)
    private String module_code;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public ProfessorDto toDto(ModelMapper mapper) {
        ProfessorDto professorDto = mapper.map(this, ProfessorDto.class);
        return professorDto;
    }
}
