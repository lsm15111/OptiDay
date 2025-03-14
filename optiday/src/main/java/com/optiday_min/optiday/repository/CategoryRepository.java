package com.optiday_min.optiday.repository;

import com.optiday_min.optiday.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByMemberId(Long memberId);
}
