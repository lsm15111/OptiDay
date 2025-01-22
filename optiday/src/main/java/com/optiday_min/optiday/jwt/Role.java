package com.optiday_min.optiday.jwt;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@Entity
@Table(name = "roles") // DB의 테이블 이름
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // 권한 이름 (예: ROLE_USER, ROLE_ADMIN)

    @Override
    public String getAuthority() {
        return name;
    }
}
