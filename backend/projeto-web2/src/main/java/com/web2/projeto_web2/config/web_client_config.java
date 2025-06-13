package com.web2.projeto_web2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
@Configuration
public class web_client_config {
    // Injeta o valor da propriedade 'resend.api.key' do application.properties
    // ou de uma variável de ambiente (se configurada)
    @Value("${resend.api.key}")
    private String resendApiKey;

    /**
     * Define um bean WebClient para a API do Resend.
     * Este WebClient já virá com a URL base e o header de autorização configurados.
     * @param webClientBuilder Um builder padrão de WebClient fornecido pelo Spring.
     * @return Uma instância de WebClient configurada para a API do Resend.
     */
    @Bean
    public WebClient resendWebClient(WebClient.Builder webClientBuilder) {
        return webClientBuilder
                .baseUrl("https://api.resend.com") // URL base da API do Resend
                // Adiciona o header de autorização com a chave de API (Bearer Token)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + resendApiKey)
                // Define o tipo de conteúdo padrão para JSON
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
