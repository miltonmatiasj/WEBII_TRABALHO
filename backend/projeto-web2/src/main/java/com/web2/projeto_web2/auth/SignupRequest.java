package com.web2.projeto_web2.auth;

import com.web2.projeto_web2.users.Role;

import java.util.Set;

public class SignupRequest {
    private String name;
    private String email;
    private String cpf;
    private String phone;
    private Set<Role> roles;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone;}
}
