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
    String html = "<p>Olá, <strong>" + user.getName() + "</strong>!</p><p>Sua senha  é: <strong>" + rawPassword + "</strong></p>";

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
