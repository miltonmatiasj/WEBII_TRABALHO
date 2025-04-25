import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthMockedService, User } from '../auth-mocked.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user = {
    cpf: '',
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      number: '',
      complement: '',
    },
  };

  constructor(
    private http: HttpClient,
    private authService: AuthMockedService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fetchAddress(): void {
    if (this.user.cep.trim() !== '') {
      this.http
        .get(`https://viacep.com.br/ws/${this.user.cep}/json/`)
        .subscribe(
          (data: any) => {
            if (!data.erro) {
              this.user.address.street = data.logradouro;
              this.user.address.neighborhood = data.bairro;
              this.user.address.city = data.localidade;
              this.user.address.state = data.uf;
            } else {
              alert('CEP não encontrado.');
            }
          },
          (error) => {
            alert('Erro ao buscar o CEP.');
          }
        );
    }
  }

  generatePassword(): string {
    return Math.random().toString().slice(2, 6);
  }

  onSubmit(): void {
    const password = this.generatePassword();
    const newUser: User = {
      id: this.generateRandomString(),
      cpf: this.user.cpf,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: { ...this.user.address },
      password,
    };

    this.authService.addUser(newUser);
    console.log('Usuário cadastrado:', newUser);
    alert('Cadastro realizado com sucesso! A senha foi enviada para o e-mail.' + password);
    this.router.navigate(['/login']);
  }

  generateRandomString(length: number = 30): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}
