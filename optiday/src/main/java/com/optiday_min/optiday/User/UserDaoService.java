package com.optiday_min.optiday.User;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserDaoService {

    // JPA/Hibernate > Database
    // UserDaoService > Static List
    private static List<User> users = new ArrayList<>();

    private static Integer userCount = 0;
    static {
        users.add(new User(++userCount,"sun","52fs"," ", LocalDate.now().minusYears(2),"admin@gmail.com",0101234));
    }

    public List<User> findAll(){
        return users;
    }

    public User save(User user){
        user.setId(++userCount);
        users.add(user);
        return user;
    }
}
