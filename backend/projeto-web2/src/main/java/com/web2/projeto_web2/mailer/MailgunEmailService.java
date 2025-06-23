package com.web2.projeto_web2.mailer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MailgunEmailService {

    private final WebClient webClient;

    @Value("${mailgun.api.key}")
    private String apiKey;

    @Value("${mailgun.domain}")
    private String domain;

    @Value("${mailgun.sender}")
    private String sender;

    public MailgunEmailService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.mailgun.net/v3").build();
    }

    public Mono<String> sendEmail(String to, String subject, String text, String html) {
        String url = String.format("/%s/messages", domain);

        return webClient.post()
                .uri(url)
                .headers(headers -> headers.setBasicAuth("api", apiKey))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters
                        .fromFormData("from", sender)
                        .with("to", to)
                        .with("subject", subject)
                        .with("text", text)
                        .with("html", html))
                .retrieve()
                .bodyToMono(String.class);
    }
}