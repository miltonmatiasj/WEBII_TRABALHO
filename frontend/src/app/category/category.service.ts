import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, name: 'Notebook' },
    { id: 2, name: 'Desktop' },
    { id: 3, name: 'Impressora' },
    { id: 4, name: 'Mouse' },
    { id: 5, name: 'Teclado' }
  ];

  getCategories(): Observable<Category[]>
  {
    return of(this.categories)
  }

  addNewCategory(name: string): void
  {

  }

  updateCategory(id: number, name: string): void
  {

  }

  deleteCategory(id: number):void
  {

  }
}
