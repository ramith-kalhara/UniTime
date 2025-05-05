package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.UserVoteDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "UserVote")
public class UserVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "vote")
    private String vote;

    @JoinColumn(name = "user")
    private String user;

    @JoinColumn(name = "professor")
    private String professor;

    public UserVoteDto toDto(ModelMapper mapper) {
        UserVoteDto userVoteDto = mapper.map(this, UserVoteDto.class);
        return userVoteDto;
    }


}
