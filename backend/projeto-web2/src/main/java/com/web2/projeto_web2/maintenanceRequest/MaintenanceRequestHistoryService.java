package com.web2.projeto_web2.maintenancerequesthistory;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class maintenancerequesthistoryService {

    private final maintenancerequesthistoryRepository repository;

    public maintenancerequesthistoryService(maintenancerequesthistoryRepository repository) {
        this.repository = repository;
    }

    public maintenancerequesthistory createmaintenancerequesthistory(maintenancerequesthistory request) {
        return repository.save(request);
    }

    public maintenancerequesthistory updatemaintenancerequesthistoryStatusById(UUID id, maintenancerequesthistory.Status newStatus) {
        // This method should also validate if the user is allowed to change this maintenancerequesthistory
        maintenancerequesthistory request = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("maintenancerequesthistory not found: " + id));
        validateStatusTransition(request.getStatus(), newStatus);
        request.setStatus(newStatus);
        return repository.save(request);
    }

    // Employee only method
      public List<maintenancerequesthistory> getAllmaintenancerequesthistorys() {
        return repository.findAll();
    }


    // Should validate if the user is allowed to see this maintenancerequesthistory
    public maintenancerequesthistory getmaintenancerequesthistoryById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("maintenancerequesthistory not found: " + id));
    }

    // Employee only method
    public List<maintenancerequesthistory> getAllEmployeemaintenancerequesthistorys(UUID employeeId) {
        return repository.findByEmployeeId(employeeId);
    }

    // Customer only method and should validate if the user is allowed to see this maintenancerequesthistory
    public List<maintenancerequesthistory> getAllCustomermaintenancerequesthistorys(UUID customerId) {
        return repository.findByCustomerId(customerId);
    }

    // This method will not be used but if happens to be used, then it should validate if the user is allowed to delete this maintenancerequesthistory
    public void deletemaintenancerequesthistory(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Cannot delete non-existent maintenancerequesthistory: " + id);
        }
        repository.deleteById(id);
    }

     private void validateStatusTransition(maintenancerequesthistory.Status current, maintenancerequesthistory.Status next) {
        switch (current) {
            case ABERTA:
                if (next != maintenancerequesthistory.Status.ORCADA) {
                    throw new IllegalArgumentException("Invalid transition: ABERTA → " + next);
                }
                break;
            case ORCADA:
                if (next != maintenancerequesthistory.Status.APROVADA 
                 && next != maintenancerequesthistory.Status.REJEITADA) {
                    throw new IllegalArgumentException("Invalid transition: ORCADA → " + next);
                }
                break;
            case REJEITADA:
                if (next != maintenancerequesthistory.Status.APROVADA) {
                    throw new IllegalArgumentException("Invalid transition: REJEITADA → " + next);
                }
                break;
            case APROVADA:
                if (next != maintenancerequesthistory.Status.PAGA) {
                    throw new IllegalArgumentException("Invalid transition: APROVADA → " + next);
                }
                break;
            case PAGA:
                if (next != maintenancerequesthistory.Status.ARRUMADA
                 && next != maintenancerequesthistory.Status.REDIRECIONADA) {
                    throw new IllegalArgumentException("Invalid transition: PAGA → " + next);
                }
                break;
            case ARRUMADA:
                if (next != maintenancerequesthistory.Status.FINALIZADA) {
                    throw new IllegalArgumentException("Invalid transition: ARRUMADA → " + next);
                }
                break;
            default:
                throw new IllegalArgumentException("No transitions allowed from: " + current);
        }
    }
}