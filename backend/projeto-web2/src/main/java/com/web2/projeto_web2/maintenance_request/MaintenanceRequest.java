package com.web2.projeto_web2.maintenance_request;

import com.web2.projeto_web2.category.Category;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudget;
import com.web2.projeto_web2.users.User;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequest {

    public enum Status {
        ABERTA,
        ORCADA,
        APROVADA,
        REJEITADA,
        PAGA,
        REDIRECIONADA,
        ARRUMADA,
        FINALIZADA
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank
    @Column(name = "equipment_description", nullable = false)
    private String equipmentDescription;

    @NotBlank
    @Column(name = "defect_description", nullable = false)
    private String defectDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "created_at", nullable = false)
    private Date createdAt = new Date();

    public MaintenanceRequest() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEquipmentDescription() {
        return equipmentDescription;
    }

    public void setEquipmentDescription(String equipmentDescription) {
        this.equipmentDescription = equipmentDescription;
    }

    public String getDefectDescription() {
        return defectDescription;
    }

    public void setDefectDescription(String defectDescription) {
        this.defectDescription = defectDescription;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Category getCategory() {
    return category;
}

    public void setCategory(Category category) {
        this.category = category;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}