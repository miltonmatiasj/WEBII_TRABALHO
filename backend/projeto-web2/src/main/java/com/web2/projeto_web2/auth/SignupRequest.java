package com.web2.projeto_web2.auth;

import com.web2.projeto_web2.users.Role;

import java.util.Set;

public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private Set<Role> roles;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}
