import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../users/user.service';
import { Address } from '../../users/address';
import { User } from '../../users/User';
import { NgxMaskDirective } from 'ngx-mask';

export type ViaCepResponse = {
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
};

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
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user = User.empty();
  cep?: string;
  address: Address = Address.empty();

  cpfFormControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(11),
    cpfFormValidator()
  ]);
  nameFormControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  emailFormControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl<string>('', Validators.required);

  userService = inject(UserService);

  constructor(private http: HttpClient, private router: Router) {
    this.user = User.empty();
  }

  ngOnInit(): void {}

  async fetchAddress() {
    if (this.cep && this.cep.trim() !== '') {
      const data = await lastValueFrom(
        this.http.get<ViaCepResponse | null>(
          `https://viacep.com.br/ws/${this.cep}/json/`
        )
      ).catch(() => {
        alert('Erro ao buscar o CEP.');
        return null;
      });
      if (data) {
        this.address = Address.fromViaCepResponse(data);
        this.user.setAddress(this.address);
      } else {
        alert('CEP não encontrado.');
      }
    }
  }

  areRequiredFieldsFilled(): boolean {
    return (
      this.cpfFormControl.valid &&
      this.nameFormControl.valid &&
      this.emailFormControl.valid &&
      this.phoneFormControl.valid
    );
  }

  loading = signal(false);

  async submit() {
    if (!this.areRequiredFieldsFilled()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    this.user.email = this.emailFormControl.value!;
    this.user.name = this.nameFormControl.value!;
    this.user.cpf = this.cpfFormControl.value!;
    this.user.phone = this.phoneFormControl.value!;
    this.user.roles = ['CLIENTE'];
    this.user.setAddress(this.address);
    this.loading.set(true);
    try {
      await this.userService.createUser(this.user);
      alert(
        'Cadastro realizado com sucesso! A senha foi enviada para o e-mail.'
      );
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar o usuário. Por favor, tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }
  cpfErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) {
      return 'Campo CPF inválido.';
    }
    if (errors['required']) {
      return 'CPF é obrigatório.';
    }
    if (errors['minlength']) {
      return 'CPF deve ter pelo menos 11 caracteres.';
    }
    if (errors['invalidCPF']) {
      return 'CPF inválido.';
    }
    return '';
  }
}

export function cpfFormValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    console.log(value);
    return !validateCPF(value) ? { invalidCPF: true } : null;
  }
}


export function validateCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numbers)) return false;

  const calcDigito = (size: number): number => {
    let sum = 0;
    let weight = size + 1;
    for (let i = 0; i < size; i++) {
      sum += parseInt(numbers.charAt(i), 10) * weight--;
    }
    const left = (sum * 10) % 11;
    return left === 10 ? 0 : left;
  };

  const numbers1 = calcDigito(9);
  if (numbers1 !== parseInt(numbers.charAt(9), 10)) return false;

  const numbers2 = calcDigito(10);
  return numbers2 === parseInt(numbers.charAt(10), 10);
}
