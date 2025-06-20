package com.web2.projeto_web2.auth;
import com.web2.projeto_web2.common.JwtUtil;
import com.web2.projeto_web2.users.Role;
import com.web2.projeto_web2.users.User;
import com.web2.projeto_web2.users.UserRepository;
import com.web2.projeto_web2.service.ResendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ResendEmailService resendEmailService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());

        // Default role set to CLIENTE unless specified
        Set<Role> roles = new HashSet<>();
        if (signUpRequest.getRoles() != null && !signUpRequest.getRoles().isEmpty()) {
            roles.addAll(signUpRequest.getRoles());
        } else {
            roles.add(Role.CLIENTE);
        }
        user.setRoles(roles);

        // Call mailsender service
        try{
            resendEmailService.sendPasswordEmail(signUpRequest.getEmail(), signUpRequest.getPassword())
            .subscribe(
                response -> System.out.println("E-mail de cadastro enviado com sucesso para: " + signUpRequest.getEmail()),
                error -> System.err.println("Erro ao enviar e-mail de cadastro para " + signUpRequest.getEmail() + ": " + error.getMessage())
            );
        } catch(Exception e){
            System.err.println("Exceção ao tentar enviar e-mail: " + e.getMessage());
        }

        userRepository.save(user);
        return ResponseEntity.ok(null);
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
}
