import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

loadHome(): void{
    this.router.navigate(['/customer-home']);
}

  logout(): void {
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/login']);
  }
}
