package com.optiday_min.optiday.User;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserResource {

    private UserDaoService service;

    public UserResource(UserDaoService userDaoService) {
        this.service = userDaoService;
    }
    @GetMapping("/user/{id}")
    public User retrieveUser(@PathVariable int id) {
        User user = service.findById(id);
        return user;
    }

    // 사용자 모두 출력
    @GetMapping("/users")
    public List<User> user() {
        return service.findAll();
    }
    // 사용자 생성
    @PostMapping("/user")
    public void createUser(@RequestBody User user) {
        service.save(user);
    }
    // 사용자 수정
    @PostMapping("/user/{id}")
    public void updateUser(@PathVariable int id, @RequestBody User user) {
        service.deleteById(id);
        user.setId(id);
        service.save(user);
    }
    // 사용자 삭제
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable int id){
        service.deleteById(id);
    }






}
