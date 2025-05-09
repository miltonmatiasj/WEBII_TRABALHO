package com.web2.projeto_web2.MaintenanceRequest;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "MaintenanceRequest")
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String equipmentDescription;
    private String defectDescription;

    @Enumerated(EnumType.STRING)
    private Status status;

    private UUID customerId;
    private UUID employeeId;
    private Integer categoryId;

    private LocalDateTime requestedAt;

    public enum Status {
        ABERTA, ORCADA, APROVADA, REJEITADA, PAGA, REDIRECIONADA, ARRUMADA, FINALIZADA
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEquipmentDescription() { return equipmentDescription; }
    public void setEquipmentDescription(String equipmentDescription) { this.equipmentDescription = equipmentDescription; }

    public String getDefectDescription() { return defectDescription; }
    public void setDefectDescription(String defectDescription) { this.defectDescription = defectDescription; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public UUID getCustomerId() { return customerId; }
    public void setCustomerId(UUID customerId) { this.customerId = customerId; }

    public UUID getEmployeeId() { return employeeId; }
    public void setEmployeeId(UUID employeeId) { this.employeeId = employeeId; }

    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

    public LocalDateTime getRequestedAt() { return requestedAt; } 
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
}

@Entity
@Table(name = "MaintenanceRequestBudget")
public class intenanceRequestBudget{

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
