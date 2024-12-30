package com.optiday_min.optiday.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserResource {

    private UserDaoService userDaoService;

    public UserResource(UserDaoService userDaoService) {
        this.userDaoService = userDaoService;
    }

    //사용자 모두 출력
    @GetMapping("/user")
    public List<User> user() {
        return userDaoService.findAll();
    }
    // 사용자 생성
    @GetMapping("/2")
    public void createUser() {
    }




}
