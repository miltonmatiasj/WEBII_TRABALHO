import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerHomeService } from './services/customer-home.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  displayedColumns: string[] = ['description', 'status', 'data', 'action'];
  dataSource: any[] = [];

  constructor(
    private customerHomeService: CustomerHomeService,
  ) {}

  ngOnInit(): void {
    this.customerHomeService.getCustomerData().then((m) => {
      console.log(m);
      this.dataSource = m;
    })
  }

  async applyFilter(event: Event): Promise<void> {
    // const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // this.dataSource = this.customerHomeService.getCustomerData().filter((item) => {
    //   return (
    //     item.equipmentDescription.toLowerCase().includes(filterValue) ||
    //     item.status.toLowerCase().includes(filterValue)
    //   );
    // });
  }
}
