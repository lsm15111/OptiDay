package com.optiday_min.optiday.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity(name = "user_details") // 테이블 이름
public class User {

    @Id
    @GeneratedValue
    private Integer id;
    @Size(min=2, max=10) // 제약
    private String name;
    @Size(min=4, max=4)
    private String tag;
    @Size(max=15)
    private String message;
    // **미래 금지 제약필요
    private LocalDate birthday;
    @Email
    private String email;
    private long phone;

    public User() {
    }

    public User(Integer id, String name, String tag, String message, LocalDate birthday, String email, long phone) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.message = message;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @Size(min = 2, max = 10) String getName() {
        return name;
    }

    public void setName(@Size(min = 2, max = 10) String name) {
        this.name = name;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", tag=" + tag +
                ", message='" + message + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                '}';
    }
}
