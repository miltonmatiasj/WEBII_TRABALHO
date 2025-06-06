import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/login'; // ajuste conforme seu endpoint

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<void> {
    const body = { email, password };

    return this.http.post<{ token: string }>(this.apiUrl, body).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      map(() => {}), // transforma o Observable em void
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Erro desconhecido. Tente novamente mais tarde.';

    if (error.status === 401) {
      message = 'Credenciais inválidas.';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    return throwError(() => new Error(message));
  }
}
