package com.web2.projeto_web2.MaintenanceRequest;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "MaintenanceRequestbudget")
public class MintenanceRequestBudget{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer price;
    

    private   UUID MaintenanceRequestID;
    private   UUID employeeId;
    private   LocalDateTime createdAt;

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public UUID getMaintenanceRequestID() { return MaintenanceRequestID; }
    public void setMaintenanceRequestID(UUID maintenanceRequestID) { this.MaintenanceRequestID = maintenanceRequestID; }

    public UUID getEmployeeId() { return employeeId; }
    public void setEmployeeId(UUID employeeId) { this.employeeId = employeeId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

}