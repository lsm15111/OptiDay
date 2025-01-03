package com.optiday_min.optiday.User;

import com.optiday_min.optiday.Todo.Todo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    private UserRepository service;

    public UserController(UserRepository userService) {
        this.service = userService;
    }

    @GetMapping("/user/{id}")
    public Optional<User> retrieveUser(@PathVariable Integer userId) {
        Optional<User> user = service.findById(userId);
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
    public void updateUser(@PathVariable Integer userId, @RequestBody User user) {
        service.deleteById(userId);
        user.setId(userId);
        service.save(user);
    }
    // 사용자 삭제
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Integer userId){
        service.deleteById(userId);
    }


}
