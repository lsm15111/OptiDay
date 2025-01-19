package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.entity.Category;
import com.optiday_min.optiday.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryControllder {
    private final CategoryService categoryService;


    @GetMapping("/categories") //모든 카테고리 조회
    public List<Category> retrieveAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/members/{memberId}/categories")
    public List<Category> retrieveAllCategoriesByMemberId(@PathVariable int memberId) {
        return categoryService.getCategoryById(memberId);
    }

//    @PostMapping("/members/{username}/")
}
