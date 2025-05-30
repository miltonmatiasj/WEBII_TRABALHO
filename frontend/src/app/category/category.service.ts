import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Category {
  id: string;
  categoryName: string;
  isActivated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      role: 'FUNCIONARIO',
    }),
  };

  getCategories(): Observable<Category[] | null> {
    return this.http
      .get<Category[]>(environment.baseUrl + '/categories', this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Category[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  createCategory(category: Category): Observable<Category | null> {
    return this.http
      .post<Category>(
        environment.baseUrl + '/categories',
        category,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Category>) => {
          if (resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 403) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  updateCategory(id: string, category: Category): Observable<Category | null> {
    return this.http
      .put<Category>(
        `${environment.baseUrl}/categories/${id}`,
        category,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Category>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 403) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  setCategoryStatus(
    id: string,
    category: Category
  ): Observable<Category | null> {
    return this.http
      .patch<Category>(
        `${environment.baseUrl}/categories/${id}`,
        category,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Category>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 403) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getCategoryById(id: string): Observable<Category | null> {
    return this.http
      .get<Category>(
        `${environment.baseUrl}/categories/${id}`,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Category>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getCategoryByStatus(status: boolean): Observable<Category[] | null> {
    return this.http
      .get<Category[]>(
        `${environment.baseUrl}/categories?isActivated=${status}`,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Category[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
