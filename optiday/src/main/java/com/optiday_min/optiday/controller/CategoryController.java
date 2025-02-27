package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.CategoryRequest;
import com.optiday_min.optiday.domain.Category;
import com.optiday_min.optiday.dto.CategoryResponse;
import com.optiday_min.optiday.repository.CategoryRepository;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final static Logger logger = LoggerFactory.getLogger(CategoryController.class);
    private final CategoryService categoryService;
    private final UserService userService;

    @GetMapping("/all") //모든 카테고리 조회
    public List<Category> retrieveAllCategories() {
        return categoryService.getAllCategories();
    }

    // 조회
    @GetMapping("/me")
    public ResponseEntity<List<Category>> retrieveAllCategoriesByEmail(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        List<Category> categories = categoryService.getCategoryByMemberId(memberId);
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(categories); // 200 OK
    }

    // 생성
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestHeader("Authorization") String token,
                                                   @Valid @RequestBody CategoryRequest categoryRequest) {
        Long memberId = userService.getMemberIdForToken(token);
        Category category = categoryService.saveCategory(categoryRequest,memberId);
        return ResponseEntity.ok(category);
    }
    
    // 수정
    @PutMapping("{categoryId}")
    public ResponseEntity<Category> updateCategory(@RequestHeader("Authorization") String token,
                                                   @Valid @RequestBody CategoryRequest categoryRequest,
                                                   @PathVariable Long categoryId) {
        Long memberId = userService.getMemberIdForToken(token);
        Category category = categoryService.updateCategory(categoryRequest,memberId,categoryId);
        return ResponseEntity.ok(category);
    }
    //이름 수정
    @PatchMapping(value = "{categoryId}/update-name", consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Category> updateCategoryName(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long categoryId,
                                                       @RequestBody Map<String, String> request){
        String name = request.get("name");
        Category category = categoryService.updateNameForCategory(categoryId,name);
        return ResponseEntity.ok(category);
    }
    //컬러 수정
    @PatchMapping(value = "{categoryId}/update-color", consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Category> updateCategoryColor(@RequestHeader("Authorization") String token,
                                                        @PathVariable Long categoryId,
                                                        @RequestBody Map<String, String> request){
        String color = request.get("color");
        Category category = categoryService.updateColorForCategory(categoryId,color);
        return ResponseEntity.ok(category);
    }
    // 삭제
    @DeleteMapping("{categoryId}")
    public void deleteCategory(@RequestHeader("Authorization") String token, @PathVariable Long categoryId) {
        Long memberId = userService.getMemberIdForToken(token);
        categoryService.removeCategory(memberId,categoryId);
    }

}
