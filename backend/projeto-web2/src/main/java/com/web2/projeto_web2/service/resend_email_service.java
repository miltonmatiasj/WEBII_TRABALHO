package com.web2.projeto_web2.service;

import com.web2.projeto_web2.dto.ResendEmailRequest;
import com.web2.projeto_web2.dto.ResendEmailResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class resend_email_service {
    private final WebClient resendWebClient; // WebClient injetado do WebClientConfig

    // Injeção de dependência do WebClient configurado
    public ResendEmailService(WebClient resendWebClient) {
        this.resendWebClient = resendWebClient;
    }

    /**
     * Envia um e-mail com uma senha gerada para o destinatário especificado.
     * @param toEmail O endereço de e-mail do destinatário.
     * @param password A senha gerada que será incluída no e-mail.
     * @return Um Mono que representa a resposta da API do Resend.
     */
    public Mono<ResendEmailResponse> sendPasswordEmail(String toEmail, String password) {
        // O e-mail DEVE ser de um domínio que você verificou no Resend.
        // Substitua 'onboarding@seusite.com' pelo seu email de remetente verificado.
        String fromEmail = "Sua Empresa <onboarding@seusite.com>";
        String subject = "Sua Nova Senha Gerada";
        String htmlContent = "<p>Olá,</p>" +
                             "<p>Sua nova senha para acesso é: <strong>" + password + "</strong></p>" +
                             "<p>Por favor, altere sua senha após o primeiro login por motivos de segurança.</p>" +
                             "<p>Atenciosamente,</p>" +
                             "<p>A Equipe do seu Sistema.</p>";

        // Constrói o corpo da requisição para a API do Resend
        ResendEmailRequest request = new ResendEmailRequest(
            fromEmail,
            Collections.singletonList(toEmail), // Envia para uma única pessoa
            subject,
            htmlContent
        );

        // Realiza a requisição HTTP POST para a API do Resend
        return resendWebClient.post()
                              .uri("/emails") // O endpoint específico da API do Resend (baseUrl já é 'https://api.resend.com')
                              .bodyValue(request) // Define o corpo da requisição como o objeto ResendEmailRequest
                              .retrieve()         // Inicia o processo de recuperação da resposta
                              .bodyToMono(ResendEmailResponse.class) // Mapeia a resposta JSON para o objeto ResendEmailResponse
                              // Ações reativas para sucesso e erro (para fins de log, etc.)
                              .doOnSuccess(response -> System.out.println("DEBUG: E-mail enviado com sucesso pelo Resend. ID: " + response.getId()))
                              .doOnError(error -> System.err.println("ERRO: Falha ao enviar e-mail pelo Resend. Detalhes: " + error.getMessage()));
    }
}
