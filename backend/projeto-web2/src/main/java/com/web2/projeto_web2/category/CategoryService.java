package com.web2.projeto_web2.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web2.projeto_web2.common.ResourceNotFoundException;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryById(Long id){
        return categoryRepository.findById(id);
    }

    public List<Category> listAllCategories(){
        return categoryRepository.findAll();
    }

    public Category updateCategory(Long id, Category categoryDetails){
        Category category = categoryRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setCategoryName(categoryDetails.getCategoryName());
        category.setIsActivated(categoryDetails.getIsActivated());
        return categoryRepository.save(category);

    }

    public Category setIsCategoryActivated(Long id, Boolean isActivated){
        Category category = categoryRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setIsActivated(isActivated);
        return categoryRepository.save(category);
    }
}
