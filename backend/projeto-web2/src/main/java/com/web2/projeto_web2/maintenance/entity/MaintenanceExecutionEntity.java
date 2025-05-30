package com.web2.projeto_web2.maintenance.entity;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "maintenanceExecution")
public class MaintenanceExecutionEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "maintenanceDescription")
    private String maintenanceDescription;

    @Column(name = "guidance")
    private String guidance;

    @ManyToOne
    @JoinColumn(name = "employeeId", nullable = false)
    private User employee;

   @ManyToOne
   @JoinColumn(name = "maintenanceRequestId", nullable = false)
   private MaintenanceRequest maintenanceRequest;

    @Column(name = "createdAt", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMaintenanceDescription() {
        return maintenanceDescription;
    }

    public void setMaintenanceDescription(String maintenanceDescription) {
        this.maintenanceDescription = maintenanceDescription;
    }

    public String getGuidance() {
        return guidance;
    }

    public void setGuidance(String guidance) {
        this.guidance = guidance;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }
   public MaintenanceRequest getMaintenanceRequest() {
       return maintenanceRequest;
   }

  public void setMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
       this.maintenanceRequest = maintenanceRequest;
   }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}