package com.optiday_min.optiday;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Member {

    @Id
    @GeneratedValue
    private Integer id;
    @Column()
    private String name;


    private String email;
    private String phone;


}
