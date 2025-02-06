package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByMemberId(Long memberId);
}
