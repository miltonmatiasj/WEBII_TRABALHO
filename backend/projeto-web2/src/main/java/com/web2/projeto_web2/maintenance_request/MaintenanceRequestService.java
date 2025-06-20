package com.web2.projeto_web2.maintenance_request;
import com.web2.projeto_web2.maintenance_request_history.MaintenanceRequestHistoryService;
import com.web2.projeto_web2.users.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaintenanceRequestService {

    private static final Logger logger = LoggerFactory.getLogger(MaintenanceRequestService.class);

    private final MaintenanceRequestRepository repository;
    private final MaintenanceRequestHistoryService historyService;

    public MaintenanceRequestService(MaintenanceRequestRepository repository, MaintenanceRequestHistoryService historyService) {
        this.repository = repository;
        this.historyService = historyService;
    }

    public MaintenanceRequest createMaintenanceRequest(MaintenanceRequest request) {
        logger.debug("==================================" + request);
        request.setStatus(MaintenanceRequest.Status.ABERTA);
        MaintenanceRequest result = repository.save(request);
        historyService.registrarHistorico("CRIAR SOLICITAÇÃO", request, null);
        return result;
    }

    public MaintenanceRequest updateMaintenanceRequestStatusById(UUID id, MaintenanceRequest.Status newStatus) {
        // This method should also validate if the user is allowed to change this MaintenanceRequest
        MaintenanceRequest request = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("MaintenanceRequest not found: " + id));
        validateStatusTransition(request.getStatus(), newStatus);
        request.setStatus(newStatus);
        return repository.save(request);
    }

    public MaintenanceRequest updatePaymentMethodById(UUID id, String paymentMethod) {
        MaintenanceRequest request = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("MaintenanceRequest not found: " + id));
        request.setPaymentMethod(paymentMethod);
        return repository.save(request);
    }

    public MaintenanceRequest updateRequestUserId(UUID id, User user) {
        MaintenanceRequest request = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("MaintenanceRequest not found: " + id));
        request.setEmployee(user);
        return repository.save(request);
    }

    // Employee only method
      public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return repository.findAll();
    }


    // Should validate if the user is allowed to see this MaintenanceRequest
    public MaintenanceRequest getMaintenanceRequestById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("MaintenanceRequest not found: " + id));
    }

    // Employee only method
    public List<MaintenanceRequest> getAllEmployeeMaintenanceRequests(UUID employeeId) {
        return repository.findByEmployeeId(employeeId);
    }

    // Customer only method and should validate if the user is allowed to see this MaintenanceRequest
    public List<MaintenanceRequest> getAllCustomerMaintenanceRequests(UUID customerId) {
        return repository.findByCustomerId(customerId);
    }

    // This method will not be used but if happens to be used, then it should validate if the user is allowed to delete this MaintenanceRequest
    public void deleteMaintenanceRequest(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Cannot delete non-existent MaintenanceRequest: " + id);
        }
        repository.deleteById(id);
    }

     private void validateStatusTransition(MaintenanceRequest.Status current, MaintenanceRequest.Status next) {
        switch (current) {
            case ABERTA:
                if (next != MaintenanceRequest.Status.ORCADA) {
                    throw new IllegalArgumentException("Invalid transition: ABERTA → " + next);
                }
                break;
            case ORCADA:
                if (next != MaintenanceRequest.Status.APROVADA 
                 && next != MaintenanceRequest.Status.REJEITADA) {
                    throw new IllegalArgumentException("Invalid transition: ORCADA → " + next);
                }
                break;
            case REJEITADA:
                if (next != MaintenanceRequest.Status.APROVADA) {
                    throw new IllegalArgumentException("Invalid transition: REJEITADA → " + next);
                }
                break;
            case APROVADA:
                if (next != MaintenanceRequest.Status.ARRUMADA && next != MaintenanceRequest.Status.REDIRECIONADA) {
                    throw new IllegalArgumentException("Invalid transition: APROVADA → " + next);
                }
                break;
            case PAGA:
                if (next != MaintenanceRequest.Status.FINALIZADA) {
                    throw new IllegalArgumentException("Invalid transition: PAGA → " + next);
                }
                break;
            case ARRUMADA:
                if (next != MaintenanceRequest.Status.PAGA) {
                    throw new IllegalArgumentException("Invalid transition: ARRUMADA → " + next);
                }
                break;
            default:
                throw new IllegalArgumentException("No transitions allowed from: " + current);
        }
    }
}