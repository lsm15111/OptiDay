package com.optiday_min.optiday.service;

import com.optiday_min.optiday.dto.CategoryRequest;
import com.optiday_min.optiday.domain.Category;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.dto.CategoryResponse;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import com.optiday_min.optiday.repository.CategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @PersistenceContext
    private EntityManager entityManager;

    private final CategoryRepository categoryRepository;
    private final TodoService todoService;
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoryByMemberId(Long memberId) {
        List<Category> categories = categoryRepository.findByMemberId(memberId);
        return categories;
    }

    public Category saveCategory(CategoryRequest categoryRequest, Long memberId) {
        Member memberRef = entityManager.getReference(Member.class, memberId);

        Category category = new Category(categoryRequest.getName(), categoryRequest.getColor()
                                        ,memberRef);
        return categoryRepository.save(category);
    }

    public Category updateCategory(CategoryRequest categoryRequest, Long memberId, Long categoryId) {
        Category category = getCategoryById(categoryId);

        // token - category 소유 체크
        if(!Objects.equals(category.getMember().getId(), memberId)){
            throw new NotAvailableRequestException();
        }
        category.setName(categoryRequest.getName());
        category.setColor(categoryRequest.getColor());
        categoryRepository.save(category);
        return category;
    }

    public void removeCategory(Long memberId,Long categoryId) {
        Category category = getCategoryById(categoryId);
        // 카테고리에 속한 todos 가져와서 category=null 설정
        todoService.removeCategoryFromTodos(category);
        categoryRepository.deleteById(categoryId);
    }

    public Category updateNameForCategory(Long categoryId, String rename) {
        Category category = getCategoryById(categoryId);
        category.setName(rename);
        return categoryRepository.save(category);
    }

    public Category updateColorForCategory(Long categoryId, String color) {
        Category category = getCategoryById(categoryId);
        category.setColor(color);
        return categoryRepository.save(category);
    }

    private Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }


}
