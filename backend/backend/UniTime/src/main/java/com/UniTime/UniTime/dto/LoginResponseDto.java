package com.UniTime.UniTime.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoginResponseDto {
    private String message;
    private Long userId;
    private String email;
    private String role;
}
