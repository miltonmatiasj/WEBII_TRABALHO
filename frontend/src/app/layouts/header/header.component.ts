import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from "../../authentication/auth.service";
import {MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatListItem, MatListItemIcon, MatListItemTitle, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authService = inject(AuthService);
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/login']);
  }
}
