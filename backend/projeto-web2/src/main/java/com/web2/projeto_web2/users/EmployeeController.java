package com.web2.projeto_web2.users;

import com.web2.projeto_web2.common.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class EmployeeController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
