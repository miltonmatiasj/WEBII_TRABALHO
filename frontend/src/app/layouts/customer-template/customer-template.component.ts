import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './customer-template.component.html',
  styleUrls: ['./customer-template.component.scss']
})
export class CustomerTemplateComponent {
} 