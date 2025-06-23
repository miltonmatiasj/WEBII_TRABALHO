package com.web2.projeto_web2.maintenance_request_history;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.users.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "maintenanceRequestHistory")
public class MaintenanceRequestHistory {

    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String actionName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeId", nullable = true)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maintenanceRequestId", nullable = false)
    @JsonIgnore
    private MaintenanceRequest maintenanceRequest;

    private LocalDateTime createdAt;

    // Getters and setters
    public UUID getId() {return id;}
    public void setId(UUID id) {this.id = id;}

    public String getActionName() {return actionName;}
    public void setActionName(String actionName) {this.actionName = actionName;}

    public User getEmployee() {return employee;}
    public void setEmployee(User employee) {this.employee = employee;}

    public MaintenanceRequest getMaintenanceRequest() {return maintenanceRequest;}
    public void setMaintenanceRequest(MaintenanceRequest maintenanceRequest) {this.maintenanceRequest = maintenanceRequest;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}
}





