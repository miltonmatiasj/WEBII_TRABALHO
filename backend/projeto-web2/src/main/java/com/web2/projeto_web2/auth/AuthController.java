package com.web2.projeto_web2.auth;
import com.web2.projeto_web2.common.JwtUtil;
import com.web2.projeto_web2.mailer.MailgunEmailService;
import com.web2.projeto_web2.users.Role;
import com.web2.projeto_web2.users.User;
import com.web2.projeto_web2.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MailgunEmailService mailgunEmailService;


@PostMapping("/signup")
public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
        return ResponseEntity.badRequest().body("Error: Email is already in use!");
    }

    String rawPassword = generateRandomPassword();

    User user = new User();
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(rawPassword));
    user.setName(signUpRequest.getName());
    user.setCpf(signUpRequest.getCpf());
    user.setPhone(signUpRequest.getPhone());

    Set<Role> roles = new HashSet<>();
    if (signUpRequest.getRoles() != null && !signUpRequest.getRoles().isEmpty()) {
        roles.addAll(signUpRequest.getRoles());
    } else {
        roles.add(Role.CLIENTE);
    }
    user.setRoles(roles);

    userRepository.save(user);

    String subject = "Sua nova conta foi criada!";
    String text = "Olá, " + user.getName() + "! Sua senha temporária é: " + rawPassword;
    String html = "<!DOCTYPE html>\n" +
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
            "            <p>Olá, "+ user.getName() +"</p>\n" +
            "            <p>Sua conta em nosso sistema foi criada com sucesso. Estamos muito felizes em tê-lo(a) conosco!</p>\n" +
            "\n" +
            "            <div class=\"password-box\">\n" +
            "                <strong>" + rawPassword + "</strong>\n" + 
            "            </div>\n" +
            "\n" +
            "        <div class=\"warning\">\n" +
            "            <p><strong>Atenção:</strong> Por favor, não compartilhe esta senha com ninguém. Se você não criou uma conta em nosso serviço, por favor, entre em contato imediatamente com nossa equipe de suporte.</p>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</body>\n" +
            "</html>";;

    mailgunEmailService.sendEmail(user.getEmail(), subject, text, html).subscribe();
    
return ResponseEntity.ok(Map.of("message", "Usuário criado e senha enviada por e-mail."));

}


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not found");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid password");
        }

        String token = jwtUtil.generateJwtToken(user.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private String generateRandomPassword() {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    StringBuilder password = new StringBuilder();
    for (int i = 0; i < 4; i++) {
        int index = (int) (Math.random() * characters.length());
        password.append(characters.charAt(index));
    }
    return password.toString();
}

}
