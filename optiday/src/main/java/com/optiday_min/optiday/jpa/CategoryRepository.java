package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
