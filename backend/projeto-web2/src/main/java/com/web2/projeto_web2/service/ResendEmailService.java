package com.web2.projeto_web2.service;

import com.web2.projeto_web2.dto.ResendEmailRequest;
import com.web2.projeto_web2.dto.ResendEmailResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class ResendEmailService {
    private final WebClient resendWebClient; 

    public ResendEmailService(WebClient resendWebClient) {
        this.resendWebClient = resendWebClient;
    }

    /**
     * 
     * @param toEmail
     * @param password 
     * @return 
     */
public Mono<ResendEmailResponse> sendPasswordEmail(String toEmail, String password) {
    String fromEmail = "Acme <onboarding@resend.dev>";
    String subject = "Sua Nova Senha de Acesso - [Nome do seu Serviço/Empresa]"; // Assunto atualizado
    String htmlContent = "<!DOCTYPE html>\n" +
            "<html lang=\"pt-BR\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <title>Bem-vindo(a) ao [Nome do seu Serviço/Empresa]!</title>\n" +
            "    <style>\n" +
            "        body {\n" +
            "            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n" +
            "            margin: 0;\n" +
            "            padding: 0;\n" +
            "            background-color: #f7f7f7;\n" +
            "            color: #333333;\n" +
            "            -webkit-text-size-adjust: 100%;\n" +
            "            -ms-text-size-adjust: 100%;\n" +
            "        }\n" +
            "        .container {\n" +
            "            max-width: 600px;\n" +
            "            margin: 30px auto;\n" +
            "            background-color: #ffffff;\n" +
            "            border-radius: 8px;\n" +
            "            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n" +
            "            overflow: hidden;\n" +
            "        }\n" +
            "        .header {\n" +
            "            background-color: #007bff; /* Cor primária da sua marca */\n" +
            "            padding: 20px 30px;\n" +
            "            text-align: center;\n" +
            "            color: #ffffff;\n" +
            "        }\n" +
            "        .header img {\n" +
            "            max-width: 150px;\n" +
            "            height: auto;\n" +
            "            margin-bottom: 10px;\n" +
            "        }\n" +
            "        .header h1 {\n" +
            "            margin: 0;\n" +
            "            font-size: 24px;\n" +
            "            font-weight: 600;\n" +
            "        }\n" +
            "        .content {\n" +
            "            padding: 30px;\n" +
            "            line-height: 1.6;\n" +
            "        }\n" +
            "        .content p {\n" +
            "            margin-bottom: 15px;\n" +
            "            font-size: 16px;\n" +
            "        }\n" +
            "        .password-box {\n" +
            "            background-color: #e9ecef;\n" +
            "            border: 1px dashed #ced4da;\n" +
            "            padding: 15px 20px;\n" +
            "            margin: 20px 0;\n" +
            "            text-align: center;\n" +
            "            border-radius: 6px;\n" +
            "        }\n" +
            "        .password-box strong {\n" +
            "            font-size: 28px;\n" +
            "            color: #007bff; /* Cor para destacar a senha */\n" +
            "            letter-spacing: 2px;\n" +
            "        }\n" +
            "        .footer {\n" +
            "            background-color: #f0f0f0;\n" +
            "            padding: 20px 30px;\n" +
            "            text-align: center;\n" +
            "            font-size: 13px;\n" +
            "            color: #777777;\n" +
            "            border-top: 1px solid #eeeeee;\n" +
            "        }\n" +
            "        .footer p {\n" +
            "            margin: 5px 0;\n" +
            "        }\n" +
            "        .footer a {\n" +
            "            color: #007bff;\n" +
            "            text-decoration: none;\n" +
            "        }\n" +
            "        .warning {\n" +
            "            font-size: 14px;\n" +
            "            color: #dc3545; /* Cor de alerta */\n" +
            "            margin-top: 20px;\n" +
            "            padding: 0 30px 20px;\n" +
            "            font-weight: 600;\n" +
            "        }\n" +
            "        /* Media Queries para Responsividade */\n" +
            "        @media only screen and (max-width: 600px) {\n" +
            "            .container {\n" +
            "                margin: 20px;\n" +
            "                border-radius: 0;\n" +
            "                box-shadow: none;\n" +
            "            }\n" +
            "            .header, .content, .footer, .warning {\n" +
            "                padding: 20px;\n" +
            "            }\n" +
            "            .header h1 {\n" +
            "                font-size: 20px;\n" +
            "            }\n" +
            "            .password-box strong {\n" +
            "                font-size: 24px;\n" +
            "            }\n" +
            "        }\n" +
            "    </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <div class=\"container\">\n" +
            "        <div class=\"header\">\n" +
            "            <h1>Bem-vindo(a)!</h1>\n" +
            "        </div>\n" +
            "        <div class=\"content\">\n" +
            "            <p>Olá, "+ toEmail +"</p>\n" +
            "            <p>Sua conta em nosso sistema foi criada com sucesso. Estamos muito felizes em tê-lo(a) conosco!</p>\n" +
            "            <p>Sua **senha temporária** de 4 números para o primeiro acesso é:</p>\n" +
            "\n" +
            "            <div class=\"password-box\">\n" +
            "                <strong>" + password + "</strong>\n" + 
            "            </div>\n" +
            "\n" +
            "        <div class=\"warning\">\n" +
            "            <p><strong>Atenção:</strong> Por favor, não compartilhe esta senha com ninguém. Se você não criou uma conta em nosso serviço, por favor, entre em contato imediatamente com nossa equipe de suporte.</p>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</body>\n" +
            "</html>";


        ResendEmailRequest request = new ResendEmailRequest(
            fromEmail,
            Collections.singletonList(toEmail), 
            subject,
            htmlContent
        );

        return resendWebClient.post()
                              .uri("/emails") 
                              .bodyValue(request) 
                              .retrieve()         
                              .bodyToMono(ResendEmailResponse.class) 
                              .doOnSuccess(response -> System.out.println("DEBUG: E-mail enviado com sucesso pelo Resend. ID: " + response.getId()))
                              .doOnError(error -> System.err.println("ERRO: Falha ao enviar e-mail pelo Resend. Detalhes: " + error.getMessage()));
    }
}
