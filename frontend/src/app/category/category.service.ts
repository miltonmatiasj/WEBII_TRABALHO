import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private storageKey = 'EquipmentCategory';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultCategories: Category[] = [
        { id: 1, name: 'Notebook' },
        { id: 2, name: 'Desktop' },
        { id: 3, name: 'Impressora' },
        { id: 4, name: 'Mouse' },
        { id: 5, name: 'Teclado' },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultCategories));
    }
  }

  getCategories(): Observable<Category[]> {
    const data = localStorage.getItem(this.storageKey);
    const categories = data ? JSON.parse(data) : [];
    return of(categories);
  }

  addNewCategory(name: string): void {
    const data = localStorage.getItem(this.storageKey);
    const categories: Category[] = data ? JSON.parse(data) : [];
    const newCategory: Category = {
      id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1, // Gera um novo ID
      name,
    };
    categories.push(newCategory);
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  updateCategory(id: number, name: string): void {
    const data = localStorage.getItem(this.storageKey);
    const categories: Category[] = data ? JSON.parse(data) : [];
    const index = categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      categories[index].name = name;
      localStorage.setItem(this.storageKey, JSON.stringify(categories));
    }
  }

  deleteCategory(id: number): void {
    const data = localStorage.getItem(this.storageKey);
    const categories: Category[] = data ? JSON.parse(data) : [];
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCategories));
  }
}
