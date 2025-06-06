package com.web2.projeto_web2.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRoles(Set<Role> roles);
}
