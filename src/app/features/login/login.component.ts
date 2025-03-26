import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './interfaces/login.component.html',
  styleUrls: ['./interfaces/login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Simulação de autenticação simples
    if (this.username === 'admin' && this.password === 'admin') {
      // Redireciona para a página inicial após o login bem-sucedido
      this.router.navigate(['/home']);
    } else {
      alert('Credenciais inválidas');
    }
  }
}
