import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthService} from "./authentication/auth.service";

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinner],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);
}
