import {effect, inject, Injectable, signal} from '@angular/core';
import {User} from "./User";
import {AuthService} from "../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  me = signal<User | null>(null);
  authService = inject(AuthService);
  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        const user = User.fromLocalStorage();
        if (user) {
          this.me.set(user);
        } else {
          //call api to get user
          this.me.set(null);
        }
      }
    });
  }

  createUser(user: User) {

  }
}
