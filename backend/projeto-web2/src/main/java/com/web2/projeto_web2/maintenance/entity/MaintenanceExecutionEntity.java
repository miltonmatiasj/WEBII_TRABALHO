package com.web2.projeto_web2.maintenance.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

import java.time.LocalDateTime;

@Entity
@Table (name = "MaintenanceExecution")
public class MaintenanceExecutionEntity {
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "maintenanceDescription")
    private String maintenance_description;

    @Column(name = "guidance")
    private String guidance;
    
    @Column(name = "employeeId")
    private int employeeId;

    @Column(name = "maintenanceRequestId")
    private int maintenance_request_id;

    @Column(name = "createdAt")
    private LocalDateTime  created_at = LocalDateTime.now();

    public void setMaintenanceDesc (String maintenace_description){
        this.maintenance_description = maintenace_description;
    }

    public String getMaintenanceDesc(){
        return maintenance_description;
    }

    public void setGuidance (String guidance){
        this.guidance = guidance;
    }

    public String getGuidance(){
        return guidance;
    }

    public LocalDateTime getTme(){
        return created_at;
    }
}
