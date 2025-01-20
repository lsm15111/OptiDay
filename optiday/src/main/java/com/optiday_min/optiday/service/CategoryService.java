package com.optiday_min.optiday.service;

import com.optiday_min.optiday.entity.Category;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.CategoryRepository;
import com.optiday_min.optiday.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoryByUsername(String username) {
        return memberRepository.findByUsername(username)
                .map(Member::getCategories)
                .orElseThrow(() -> new UsernameNotFoundException("Member not found with username: " + username));
    }
}
