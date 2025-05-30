package com.web2.projeto_web2.category;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "category")
public class Category {
    
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    @Getter
    @Setter
    private UUID id;

    @Getter
    @Setter
    private String categoryName;

    @Getter
    @Setter
    private Boolean isActivated;


}
