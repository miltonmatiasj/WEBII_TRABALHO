package com.web2.projeto_web2.dto;

public class email_request {
    private String to;       // Email do destinatário
    private String password; // Senha gerada pelo frontend

    // Construtor padrão (necessário para deserialização JSON)
    public email_request() {
    }

    // Construtor com todos os campos (opcional, útil para testes)
    public email_request(String to, String password) {
        this.to = to;
        this.password = password;
    }

    // Getters
    public String getTo() {
        return to;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setTo(String to) {
        this.to = to;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Opcional: método toString para facilitar o debug
    @Override
    public String toString() {
        return "EmailRequest{" +
               "to='" + to + '\'' +
               ", password='[PROTECTED]'" + // Não exibir senha em logs
               '}';
    }
}
