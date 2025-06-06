import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {lastValueFrom} from "rxjs";
import {UserService} from "../../users/user.service";
import {Address} from "../../users/address";
import {User} from "../../users/User";
import {NgxMaskDirective} from "ngx-mask";

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
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // providers: [provideNgxMask()],
})
export class RegisterComponent implements OnInit {
  user = User.empty();
  cep?: string;
  address: Address = Address.empty();

  cpfFormControl = new FormControl<string>('', [Validators.required, Validators.minLength(11)]);
  nameFormControl = new FormControl<string>('', [Validators.required, Validators.minLength(2)]);
  emailFormControl = new FormControl<string>('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl<string>('', Validators.required);
  passwordFormControl = new FormControl<string>('', Validators.required);
  rePasswordFormControl = new FormControl<string>('', Validators.required);

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
        this.address = Address.fromViaCepResponse(data);
        this.user.setAddress(this.address);
      } else {
        alert('CEP não encontrado.');
      }
    }
  }

  areRequiredFieldsFilled(): boolean {
    return this.cpfFormControl.valid
      && this.nameFormControl.valid
      && this.emailFormControl.valid
      && this.phoneFormControl.valid
      && this.passwordFormControl.valid
      && this.rePasswordFormControl.valid;
  }

  loading = signal(false);

  async submit() {
    if (!this.areRequiredFieldsFilled()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    if (this.passwordFormControl.value !== this.rePasswordFormControl.value) {
      alert('As senhas não coincidem.');
      return;
    }
    this.user.email = this.emailFormControl.value!;
    this.user.name = this.nameFormControl.value!;
    this.user.cpf = this.cpfFormControl.value!;
    this.user.phone = this.phoneFormControl.value!;
    this.user.roles = ['CLIENTE'];
    this.user.setAddress(this.address);
    this.user.setPassword(this.passwordFormControl.value!);
    this.loading.set(true);
    await this.userService.createUser(this.user, this.passwordFormControl.value!);
    this.loading.set(false);
    console.log('Usuário cadastrado:', this.user);
    alert('Cadastro realizado com sucesso! A senha foi enviada para o e-mail.');
    await this.router.navigate(['/login']);
  }
}
