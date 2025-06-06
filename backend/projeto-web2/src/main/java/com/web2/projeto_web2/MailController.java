package com.web2.projeto_web2;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web2.projeto_web2.users.User;

@RestController
@RequestMapping("/mailController")
public class MailController{

    @PostMapping
    public void sendMail(User user){

    }

    CreateEmailOption params = CreateEmailOption.builder();
}