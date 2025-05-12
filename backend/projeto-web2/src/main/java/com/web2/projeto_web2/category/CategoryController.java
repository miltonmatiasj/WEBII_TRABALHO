package com.web2.projeto_web2.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    // Create a new category (only accessible by FUNCIONARIO)
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category, @RequestHeader("role") String role){
        if(!"FUNCIONARIO".equalsIgnoreCase(role)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    //Get all categories(accessible by anyone)
    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.listAllCategories();
    }

    //Get category by id(accessible by anyone)
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable UUID id){
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //Set category status(only accessible by FUNCIONARIO)
    @PutMapping("/{id}")
    public ResponseEntity<Category> setCategoryStatus(@PathVariable UUID id, @RequestBody Category category, @RequestHeader("role") String role){
        if(!"FUNCIONARIO".equalsIgnoreCase(role)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Category updatedCategory = categoryService.setIsCategoryActivated(id, category.getIsActivated());
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    //Update a category (only accessible by FUNCIONARIO)
    @PutMapping("/{id}/full")
    public ResponseEntity<Category> updateCategory(@PathVariable UUID id, @RequestBody Category categoryDetails, @RequestHeader("role") String role){
        if(!"FUNCIONARIO".equalsIgnoreCase(role)){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

}
