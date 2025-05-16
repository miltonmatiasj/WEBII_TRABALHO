package com.web2.projeto_web2.historicosolicitacao;
// Ajustar quando der merge dos PR`s
// import com.web2.projeto_web2.request;
// import com.web2.projeto_web2.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistoricoSolicitacaoService {

    private final HistoricoSolicitacaoRepository repository;

    @Autowired
    public HistoricoSolicitacaoService(HistoricoSolicitacaoRepository repository) {
        this.repository = repository;
    }

    public List<HistoricoSolicitacao> listarTodos() {
        return repository.findAll();
    }

    public List<HistoricoSolicitacao> buscarPorSolicitacao(Integer solicitacaoId) {
        return repository.findBySolicitacaoId(solicitacaoId);
    }

    public Optional<HistoricoSolicitacao> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public HistoricoSolicitacao registrarHistorico(String estadoAnterior, String estadoAtual,
                                                   Solicitacao solicitacao, Funcionario funcionario) {
        HistoricoSolicitacao historico = new HistoricoSolicitacao();
        historico.setEstadoAnterior(estadoAnterior);
        historico.setEstadoAtual(estadoAtual);
        historico.setSolicitacao(solicitacao);
        historico.setFuncionario(funcionario);
        historico.setDataHora(LocalDateTime.now());

        return repository.save(historico);
    }

    public HistoricoSolicitacao atualizarHistorico(Integer id, String novoEstadoAtual) {
        Optional<HistoricoSolicitacao> optional = repository.findById(id);
        if (optional.isPresent()) {
            HistoricoSolicitacao historico = optional.get();
            historico.setEstadoAnterior(historico.getEstadoAtual());
            historico.setEstadoAtual(novoEstadoAtual);
            historico.setDataHora(LocalDateTime.now());
            return repository.save(historico);
        }
        throw new RuntimeException("Histórico não encontrado com ID: " + id);
    }

    public void deletarHistorico(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Histórico não encontrado para exclusão com ID: " + id);
        }
    }
}
