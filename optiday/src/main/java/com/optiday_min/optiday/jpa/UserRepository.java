package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
