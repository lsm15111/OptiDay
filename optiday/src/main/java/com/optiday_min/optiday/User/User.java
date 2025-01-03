package com.optiday_min.optiday.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.optiday_min.optiday.Todo.Todo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

@Entity(name = "user_details") // 테이블 이름
public class User {

    @Id
    @GeneratedValue
    private Integer id;
    @Size(min=2, max=10, message = "Name Length 2~10")
    private String name;
    @Size(min=4, max=4, message = "Tag Length 4")
    private String tag;
    @Size(max=15, message = "Message Max Length 15")
    private String message;
    // **미래 금지 제약필요
    @Past(message = "Birthday is not in the past")
    private LocalDate birthday;
    @Email
    private String email;
    private long phone;


    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Todo> todos;

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

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
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
