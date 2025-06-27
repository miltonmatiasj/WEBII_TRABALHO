import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../authentication/auth.service';
import { MatListItem, MatListItemTitle } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatListItem, MatListItemTitle, RouterLink],
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
