package com.web2.projeto_web2.maintenante_request_budget;

import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "maintenance_request_budget")
public class MaintenanceRequestBudget {
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @JoinColumn(name = "maintenance_request_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private MaintenanceRequest maintenanceRequest;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "evaluation", nullable = true)
    private String evaluation;

    //employeeId
    @JoinColumn(name = "employee_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private User employee;

    //createdAt
    @Column(name = "created_at", nullable = false)
    private Date createdAt = new Date();

    // Getters and Setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public MaintenanceRequest getMaintenanceRequest() {
        return maintenanceRequest;
    }
    public void setMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        this.maintenanceRequest = maintenanceRequest;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public User getEmployee() {
        return employee;
    }
    public void setEmployee(User employee) {
        this.employee = employee;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public String getEvaluation() {
        return evaluation;
    }
    public void setEvaluation(String evaluation) {
        this.evaluation = evaluation;
    }
}
