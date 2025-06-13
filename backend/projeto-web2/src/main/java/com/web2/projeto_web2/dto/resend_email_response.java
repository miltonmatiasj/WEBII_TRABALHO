package com.web2.projeto_web2.dto;

public class resend_email_response {
    private String id;        // ID único do email no Resend
    private String from;      // Email do remetente (como no request)
    private String to;        // Email do destinatário (como string, mesmo que no request seja lista)
    private String createdAt; // Timestamp de criação
    private String lastEvent; // Último evento do email (ex: "delivered", "bounced")

    // Construtor padrão
    public resend_email_response() {
    }

    // Construtor com todos os campos
    public resend_email_response(String id, String from, String to, String createdAt, String lastEvent) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.createdAt = createdAt;
        this.lastEvent = lastEvent;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getLastEvent() {
        return lastEvent;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setLastEvent(String lastEvent) {
        this.lastEvent = lastEvent;
    }

    @Override
    public String toString() {
        return "ResendEmailResponse{" +
               "id='" + id + '\'' +
               ", from='" + from + '\'' +
               ", to='" + to + '\'' +
               ", createdAt='" + createdAt + '\'' +
               ", lastEvent='" + lastEvent + '\'' +
               '}';
    }
}
