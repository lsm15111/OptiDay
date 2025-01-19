package com.optiday_min.optiday.service;

import com.optiday_min.optiday.entity.Category;
import com.optiday_min.optiday.jpa.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;


    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoryById(int memberId) {
        return categoryRepository.findById(memberId).get().getMember().getCategories();
    }
}
