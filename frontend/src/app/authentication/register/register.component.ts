import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {Address, User} from "../../users/User";
import {AuthService} from "../auth.service";
import {UserService} from "../../users/user.service";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}


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
  user = User.empty();
  cep?: string;
  address: Address = {
    zipCode: '',
    number: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  }

  userService = inject(UserService);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = User.empty();
  }

  ngOnInit(): void {
  }

  async fetchAddress() {
    if (this.cep && this.cep.trim() !== '') {
      const data = await lastValueFrom(this.http
        .get<ViaCepResponse | null>(`https://viacep.com.br/ws/${this.cep}/json/`))
        .catch(() => {
          alert('Erro ao buscar o CEP.');
          return null;
        })
      if (data) {
        this.address = {
          zipCode: data.cep,
          number: '0',
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }
        this.user.setAddress(this.address);
      } else {
        alert('CEP não encontrado.');
      }
    }
  }

  generatePassword(): string {
    return Math.random().toString().slice(2, 6);
  }

  onSubmit(): void {
    this.user.setAddress(this.address)
    const password = this.generatePassword();
    this.user.setPassword(password);
    this.userService.createUser(this.user);
    console.log('Usuário cadastrado:', this.user);
    alert('Cadastro realizado com sucesso! A senha foi enviada para o e-mail.');
    this.router.navigate(['/login']);
  }
}
