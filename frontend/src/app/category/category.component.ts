import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService, Category } from './category.service';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from "@angular/material/tooltip";

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
    MatTooltipModule
  ],
})
export class CategoryComponent implements OnInit {
  categories = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['categoryName', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[] | null) => {
        this.categories.data = data ?? [];
      },
      error: (err) => {
        console.warn(err);
      }
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
        : { id: null, categoryName: '', action: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.action === 'create' && result.categoryName) {
        const newCategory: Category = {
          id: '',
          categoryName: result.categoryName,
          isActivated: true,
        };
        this.categoryService.createCategory(newCategory).subscribe(() => {
          this.loadCategories()
        });
      }

      if (result.action === 'edit' && result?.categoryName && result?.id) {
        const updatedCategory: Category = {
          id: result.id,
          categoryName: result.categoryName,
          isActivated: result.isActivated ?? true,
        };
        this.categoryService.updateCategory(result.id, updatedCategory).subscribe(() => {
          this.loadCategories();
        });
      }

      if(result.action === 'delete' && result?.id) {
        this.updateCategoryStatus(result.id, false);
      }
    });
  }

  getCategoriesByStatus(status: boolean) {
    this.categoryService.getCategoryByStatus(status).subscribe({
      next: (data) => {
        this.categories.data = data ?? [];
        console.log('Categorias:', data);
      },
      error: (err) => {
          console.error('Erro ao buscar categorias:', err);
      }
    });
  }

  updateCategoryStatus(id: string, isActivated: boolean): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        if (category) {
          const updatedCategory: Category = {
            id: category.id,
            categoryName: category.categoryName,
            isActivated: isActivated,
          };

          this.categoryService.setCategoryStatus(id, updatedCategory).subscribe(() => {
            this.loadCategories();
          });
        } else {
          console.error("Categoria não encontrada para o ID:", id);
        }
      },
      error: (err) => {
        console.error("Erro ao buscar categoria:", err);
      }
    });
  }


}
