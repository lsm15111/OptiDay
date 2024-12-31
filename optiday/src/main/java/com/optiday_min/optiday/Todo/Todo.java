package com.optiday_min.optiday.Todo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.optiday_min.optiday.User.User;
import jakarta.persistence.*;

@Entity
public class Todo {

    @Id
    @GeneratedValue
    private int id;

    private String title;

    private String description;

    private String status;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
