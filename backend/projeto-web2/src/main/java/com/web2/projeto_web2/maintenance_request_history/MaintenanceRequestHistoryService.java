package com.web2.projeto_web2.maintenance_request_history;

import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.users.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaintenanceRequestHistoryService {

    private final MaintenanceRequestHistoryRepository repository;

    public MaintenanceRequestHistoryService(MaintenanceRequestHistoryRepository repository) {
        this.repository = repository;
    }

    public List<MaintenanceRequestHistory> listarTodos() {
        return repository.findAll();
    }

    public List<MaintenanceRequestHistory> buscarPorSolicitacao(UUID maintenanceRequestId) {
        return repository.findByMaintenanceRequestId(maintenanceRequestId);
    }

    public Optional<MaintenanceRequestHistory> buscarPorId(UUID id) {
        return repository.findById(id);
    }

    public MaintenanceRequestHistory registrarHistorico(String actionName, MaintenanceRequest maintenanceRequest, User employee) {
        MaintenanceRequestHistory historico = new MaintenanceRequestHistory();
        historico.setActionName(actionName);
        historico.setMaintenanceRequest(maintenanceRequest);
        historico.setEmployee(employee);
        historico.setCreatedAt(LocalDateTime.now());
        return repository.save(historico);
    }

    public MaintenanceRequestHistory atualizarHistorico(UUID id, String actionName) {
        MaintenanceRequestHistory historico = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("MaintenanceRequestHistory not found: " + id));
        historico.setActionName(actionName);
        historico.setCreatedAt(LocalDateTime.now());
        return repository.save(historico);
    }

    public void deletarHistorico(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("MaintenanceRequestHistory not found: " + id);
        }
        repository.deleteById(id);
    }
}
