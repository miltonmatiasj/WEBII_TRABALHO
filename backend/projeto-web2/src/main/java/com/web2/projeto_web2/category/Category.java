package com.web2.projeto_web2.category;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
    
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String categoryName;
    private Boolean isActivated;

    public UUID getId(){
        return this.id;
    }

    public void setId(UUID id){
        this.id = id;
    }

    public String getCategoryName(){
        return this.categoryName;
    }

    public void setCategoryName(String name){
        this.categoryName = name;
    }

    public Boolean getIsActivated(){
        return this.isActivated;
    }

    public void setIsActivated(Boolean isActivated){
        this.isActivated = isActivated;
    }
}
