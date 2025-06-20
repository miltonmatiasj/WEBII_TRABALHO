package com.web2.projeto_web2.maintenance_request;

import com.web2.projeto_web2.maintenance_request_history.MaintenanceRequestHistory;
import com.web2.projeto_web2.maintenance_request_history.MaintenanceRequestHistoryService;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudget;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudgetService;
import com.web2.projeto_web2.users.User;
import com.web2.projeto_web2.users.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestHistoryService maintenanceRequestHistoryService;

    private final MaintenanceRequestService service;
    private final UserService userService;
    private final MaintenanceRequestBudgetService maintenanceRequestBudgetService;

    public MaintenanceRequestController(
            MaintenanceRequestService service,
            MaintenanceRequestBudgetService maintenanceRequestBudgetService,
            UserService userService,
            MaintenanceRequestHistoryService maintenanceRequestHistoryService
    ) {
        this.service = service;
        this.userService = userService;
        this.maintenanceRequestBudgetService = maintenanceRequestBudgetService;
        this.maintenanceRequestHistoryService = maintenanceRequestHistoryService;
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequest> createMaintenanceRequest(
            @Valid @RequestBody MaintenanceRequest request) {
        MaintenanceRequest saved = service.createMaintenanceRequest(request);
        return ResponseEntity
                .created(URI.create("/api/maintenance-requests/" + saved.getId()))
                .body(saved);
    }

    @GetMapping()
    public ResponseEntity<Iterable<MaintenanceRequest>> getAllMaintenanceRequests() {
        Iterable<MaintenanceRequest> requests = service.getAllMaintenanceRequests();
        return ResponseEntity.ok(requests);
    }

@GetMapping("/{id}")
public ResponseEntity<MaintenanceRequest> getMaintenanceRequestById(@PathVariable("id") UUID id) {
    MaintenanceRequest request = service.getMaintenanceRequestById(id);
    List<MaintenanceRequestHistory> history = maintenanceRequestHistoryService.getHistoryByMaintenanceRequestId(id);
    
    return ResponseEntity.ok(request);
}

    @GetMapping("/{id}/budget")
    public ResponseEntity<MaintenanceRequestBudget> getMaintenanceRequestBudgetByRequestId(@PathVariable("id") UUID id) {
        MaintenanceRequestBudget request = maintenanceRequestBudgetService.getMaintenanceRequestBudgetByRequestId(id);
        return ResponseEntity.ok(request);
    }

@PutMapping("/{id}/status")
public ResponseEntity<MaintenanceRequest> updateMaintenanceRequestStatus(
        @PathVariable("id") UUID id,
        @RequestBody MaintenanceRequest request) {

    MaintenanceRequest updated = service.updateMaintenanceRequestStatusById(id, request.getStatus());

    if (request.getPaymentMethod() != null) {
        service.updatePaymentMethodById(id, request.getPaymentMethod());
    }

    if (request.getStatus() == MaintenanceRequest.Status.REDIRECIONADA && request.getEmployee().getId() != null) {
        User user = userService.getUserById(request.getEmployee().getId());
        if (user != null) {
            service.updateRequestUserId(id, user);
        }
    }
    
    MaintenanceRequest persistedRequest = service.getMaintenanceRequestById(id);

    String actionName = switch (request.getStatus()) {
        case APROVADA -> "ORÇAMENTO APROVADO";
        case REJEITADA -> "ORÇAMENTO REJEITADO";
        case REDIRECIONADA -> "ORÇAMENTO REDIRECIONADO";
        case PAGA -> "ORÇAMENTO PAGO";
        case FINALIZADA -> "ORÇAMENTO FINALIZADO";
        default -> "AÇÃO DESCONHECIDA";
    };

    maintenanceRequestHistoryService.registrarHistorico(actionName, persistedRequest, request.getEmployee());

    return ResponseEntity.ok(updated);
}

}