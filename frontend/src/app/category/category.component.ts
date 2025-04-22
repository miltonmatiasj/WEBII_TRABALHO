import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService, Category } from '../category/category.service';
import { ModalComponent } from '../category/modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CategoryComponent implements OnInit {
  categories = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories.data = data;
    });
  }

  openDialog(
    category?: Category,
    action: 'create' | 'edit' | 'delete' = 'create'
  ): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '300px',
      data: category
        ? { ...category, action }
        : { id: null, name: '', action: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'delete' && result?.id) {
        this.categoryService.deleteCategory(result.id); // Exclui a categoria
        this.loadCategories(); // Recarrega as categorias
      } else if (result?.action === 'edit' && result?.id && result?.name) {
        this.categoryService.updateCategory(result.id, result.name); // Atualiza a categoria
        this.loadCategories(); // Recarrega as categorias
      } else if (result?.action === 'create' && result?.name) {
        this.categoryService.addNewCategory(result.name); // Adiciona uma nova categoria
        this.loadCategories(); // Recarrega as categorias
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id);
    this.loadCategories();
  }
}
