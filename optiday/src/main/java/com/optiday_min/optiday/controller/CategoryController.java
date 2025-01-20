package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.entity.Category;
import com.optiday_min.optiday.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/categories") //모든 카테고리 조회
    public List<Category> retrieveAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/members/{username}/categories")
    public ResponseEntity<List<Category>> retrieveAllCategoriesByUsername(@PathVariable String username) {
        List<Category> categories = categoryService.getCategoryByUsername(username);
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(categories); // 200 OK
    }

//    @PostMapping("/members/{username}/")
}
